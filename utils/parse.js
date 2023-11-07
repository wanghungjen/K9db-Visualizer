import { Annotations } from "./interface.js"

// Helper Functions
/* returns the text before the first '(', left parenthesis
   for example, "stories(id)" => "stories" and
   "users(id) => "users"
*/
function textBeforeLeftParen(text) {
    let leftParenIdx = text.indexOf('(')
    if (leftParenIdx === -1) {
        return text
    } else {
        return text.substring(0, leftParenIdx)
    }
}

/* return an Edge object. For example
story_id int not null owned_by stories(id) =>
{
    annotation: 'owned_by',
    from: 'taggings',
    to: 'stories',
    edgeName: 'story_id'
}
*/
function parseEdge(inputString, currTableName) {
    let tokens = inputString.split(' ')
    tokens = tokens.filter(token => token !== '')

    // Check if the string contains "owned_by" or "accessed_by"
    const byKeywords = [Annotations.OwnedBy, Annotations.AccessedBy]
    for (const byKeyword of byKeywords) {
        if (inputString.includes(byKeyword)) {
            return {
                annotation: byKeyword,
                from: currTableName,
                to: textBeforeLeftParen(tokens.at(-1)),
                edgeName: tokens.at(0)
            }
        }
    }

    // Check if the string contains "owns" or "accesses"
    const keywords = [Annotations.Owns, Annotations.Accesses]
    for (const keyword of keywords) {
        if (inputString.includes(keyword)) {
            return {
                annotation: keyword,
                from: textBeforeLeftParen(tokens.at(-1)),
                to: currTableName,
                edgeName: tokens.at(0)
            }
        }
    }
    // no annotation
    return {}
}

/* Given one create SQL statement with k9db annotations, returns a list of Node
or Edges
*/
function parseCreateStatement(inputString) {
    // 1: Remove extra spaces and convert to lowercase
    inputString = inputString.replace(/\s+/g, ' ').replace(/[\t\r\n]+/g, '')
    inputString = inputString.trim().toLowerCase()

    // 2: Extract the table name
    let tokens = inputString.split(' ')
    let tableIdx = tokens.indexOf("table")
    console.assert(tableIdx < tokens.length, "No table name")
    let tableName = tokens[tableIdx + 1]
    console.assert(tableName.length > 0, "Invalid table name")

    // 2: Check if the annotation, 'data_subject', exists
    if (inputString.includes(Annotations.DataSubject)) {
        return [{
            annotation: "data_subject",
            tableName: tableName
        }];
    }

    // 3: Extract text between the first '(' and the last ')'
    //    Split the text by comma (',')
    const firstParenIdx = inputString.indexOf('(')
    const lastParenIdx = inputString.lastIndexOf(')')
    if (firstParenIdx === -1 || lastParenIdx === -1 ||
        lastParenIdx <= firstParenIdx) {
        return null; // No valid match found
    }
    const textBetween = inputString.substring(firstParenIdx + 1, lastParenIdx);
    const splitText = textBetween.split(',');

    // 4: construct the result array
    let res = [] // an array of Edge objects
    for (const subStr of splitText) {
        let dict = parseEdge(subStr, tableName)
        if (Object.keys(dict).length > 0) {
            res.push(dict)
        }
    }
    return res
}

//-----------------------------------------------------------------------------
/* Parse API
Given an array of SQL create statements with K9db annotations, 
returns a list of Node and Edge objects. If any statement is invalid, 
empty array will be returned. */
export default function parse(input) {
    let statements = input.split(/(?=CREATE)/).map(statement => statement.replace(/\\n/g, ''));
    var res = []
    for (const statement of statements) {
        if (statement.toLowerCase().indexOf("create") !== -1) {
            res.push(...parseCreateStatement(statement))
        } else {
            // non-create statements will be ignored
            continue
        }
    }
    return res
}
