
import { parseSentences } from "./parse.js"
import { Annotations } from "./types.js"

const sussyColumns = [
    "name", "email", "password", "gender", "user",
    "firstname", "lastname", "username", "middlename",
    "first_name", "last_name", "user_name", "middle_name",
    "first-name", "last-name", "user-name", "middle-name"
]

// Given a statement string, returns a list of  sussy columns
export function getSussyColumns(statement) {
    let sussyColumns = [];
    const sentences = parseSentences(statement)
    const columns = parseColumns(sentences)
    if (columns != null) {
        for (let i = 0; i < columns.length; i++) {
            if (isSussyColumn(columns[i], sentences[i])) {
                console.log("sussy column found " + columns[i])
                sussyColumns.push(columns[i])
            }
        }
    }
    return sussyColumns
}

// check if the given column is sussy
function isSussyColumn(columnName, sentence) {
    return (!(sentence.includes(Annotations.AccessedBy) || sentence.includes(Annotations.Accesses)
        || sentence.includes(Annotations.OwnedBy) || sentence.includes(Annotations.Owns))
        && (sussyColumns.some(c => columnName.includes(c))))
}

// extracts columns from the given sentences. returns a list of columns
function parseColumns(sentences) {
    let columns = []
    for (const s of sentences) {
        let col = extractColumnName(s)
        if (col != '') {
            columns.push(col)
        }
    }
    return columns
}

function extractColumnName(sentence) {
    const words = sentence.trim().split(/\s+/);
    return words[0];
}