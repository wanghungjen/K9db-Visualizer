import { getSussyColumns } from "./suggestion.js"
import { Annotations } from "./types.js"

// Given an array of SQL create statements as an input string,
// return a list of sanitized sentences where in each sentence,
// extra spaces/tabs are removed and all charactes are lowered
function getSanitizedStatements(inputStr) {
    // split the input string by the `CREATE` keyword into an array of sentences
    let statements = inputStr.trim().split(/(?=CREATE)/)
    let sanitized = []
    for (let statement of statements) {
        statement = statement.toLowerCase()
        if (statement.includes("create")) {
            // remove extra spaces and tabs
            statement = statement.replace(/[\n\t\r]/g, '')
            sanitized.push(statement)
        }
    }

    return sanitized
}

// Given a create statement, extract text between the first '(' and the last ')'
// split the text by comma into a list of sentences
export function parseSentences(statement) {
    let firstParenIdx = statement.indexOf('(')
    let lastParenIdx = statement.lastIndexOf(')')
    if (firstParenIdx === -1 || lastParenIdx === -1 ||
        lastParenIdx <= firstParenIdx) {
        console.assert(false, "Invalid create statement: ", statement)
        return null; // No valid match found
    }
    let textBetween = statement.substring(firstParenIdx + 1, lastParenIdx);
    let sentences = textBetween.split(',').map((sentence) => sentence.trim())
    return sentences
}

// parse the table name of a create statement
function parseTableName(statement) {
    let tokens = statement.split(' ')
    let tableKeywordIdx = tokens.indexOf("table")
    console.assert(tableKeywordIdx !== -1, 
        "No table keyword in the statement: ", statement)
    return tokens[tableKeywordIdx + 1]
}

// parse the primary key of a create statement
function parsePrimaryKey(statement) {
    let sentences = parseSentences(statement)
    for (const sentence of sentences) {
        if (sentence.includes("primary key")) {
            // the first word in this sentence will be the primary key name
            let tokens = sentence.trim().split(' ')
            return tokens[0]
        }
    }
    console.assert(false, "No primary key found in ", statement)
}

// Given an array of SQL create statements,
// return a hashmap that maps table names to their primary keys;
// used for determining the cardinality of relations between two tables
function getPrimaryKeyMap(statements) {
    let res = {}
    for (let statement of statements) {
        let tableName = parseTableName(statement)
        console.assert(!(tableName in res),
            "The table is created more than once: ", tableName)
        let primaryKeyName = parsePrimaryKey(statement)
        res[tableName] = primaryKeyName
    }
    return res
}

/* Given a sentence, return an Edge object. For example,
given
    sentence = "story_id int not null owned_by stories(id)",
    currTable = "stories"
return
    {
        annotation: 'owned_by',
        from: 'taggings',
        to: 'stories',
        edgeName: 'story_id'
    }
*/
function parseEdge(sentence, currTable, pkMap) {
    let tokens = sentence.split(' ').filter((token) => token !== '')
    let currField = tokens[0]
    // if the current field is the primary key of the current table,
    // the cardinality is 1. If not, the cardinality is n
    let currCardinality = pkMap[currTable] === currField ? '1' : 'n'

    // for example, "stories(id)" => ["stories", "id"]
    function parseTableAndFieldNames(text) {
        let idx = text.indexOf('(')
        // log(idx)
        console.assert(idx !== -1, "Invalid sentence: ", sentence)
        return [text.substring(0, idx), text.substring(idx + 1, text.length - 1)]
    }

    // if the sentence contains a keyword, it's an edge
    const byKeywords = [Annotations.OwnedBy, Annotations.AccessedBy]
    const nonByKeywords = [Annotations.Owns, Annotations.Accesses]
    for (const keyword of [...byKeywords, ...nonByKeywords]) {
        if (tokens.includes(keyword)) {
            let [otherTable, otherField] = parseTableAndFieldNames(tokens.at(-1))
            let otherCardinality = pkMap[otherTable] === otherField ? '1' : 'n'
            if (byKeywords.includes(keyword)) { // "owned_by" or "accessed_by"
                return {
                    annotation: keyword,
                    from: currTable,
                    fromCardinality: currCardinality,
                    to: otherTable,
                    toCardinality: otherCardinality,
                    edgeName: currField
                }
            } else { // "owns" or "accesses"
                return {
                    annotation: keyword,
                    from: otherTable,
                    fromCardinality: otherCardinality,
                    to: currTable,
                    toCardinality: currCardinality,
                    edgeName: currField
                }
            }
        }
    }

    // no annotation
    return {}
}

// Given one create SQL statement with k9db annotations and a primary key map
// returns a list of Node or Edge objects
function parseCreateStatement(statement, pkMap) {
    let tableName = parseTableName(statement)

    // check if the annotation, 'data_subject', exists
    let res = []
    if (statement.includes(Annotations.DataSubject)) {
        res.push({
            annotation: "data_subject",
            tableName: tableName,
            warningMsg: getSussyColumns(statement)
        })
    } else {
        res.push({
            annotation: "non_data_subject",
            tableName: tableName,
            warningMsg: getSussyColumns(statement)
        })
    }

    // construct an array of Edge objects
    const sentences = parseSentences(statement)
    for (const sentence of sentences) {
        let dict = parseEdge(sentence, tableName, pkMap)
        if (Object.keys(dict).length > 0) {
            res.push(dict)
        }
    }
    return res
}

/* Parse API
Given an array of SQL create statements with K9db annotations as an input string,
returns a list of Node and Edge objects. */
export function parse(inputStr) {
    // 1. parse the input string into a list of edge/node objects
    let statements = getSanitizedStatements(inputStr)
    let pkMap = getPrimaryKeyMap(statements)

    var parsedObjects = []
    for (const statement of statements) {
        parsedObjects.push(...parseCreateStatement(statement, pkMap))
    }
    return parsedObjects
}
