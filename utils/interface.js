import { parse } from "./parse.js"
import { calculateCoordinates } from './coordinate.js'
import { validate } from "./validate.js"
import { isDataSubject } from "./types.js"

// return a list of parsed objects and a coordinate map that maps nodes to coordinates
export function getCoords(parsedObjects, canvasW, canvasH) {
    // 1. Add non_data_subject nodes to the result object list
    let allNodes = new Set()
    let dataSubjectNodes = new Set()
    for (const obj of parsedObjects) {
        if (isDataSubject(obj)) {
            dataSubjectNodes.add(obj.tableName)
            allNodes.add(obj.tableName)
        } else { // an edge object
            allNodes.add(obj.from)
            allNodes.add(obj.to)
        }
    }
    for (const node of allNodes) {
        if (!dataSubjectNodes.has(node)) {
            parsedObjects.push({
                annotation: 'non_data_subject',
                tableName: node
            })
        }
    }

    // 2. Build a graph and validate if the graph is valid.
    // If not, the `errMsg` will be added to problem edges
    let [invalidType, modifiedObjects] = validate(parsedObjects)
    // console.log("Interface 10: ", invalidType, modifiedObjects)

    // 3. Pass objects with potentially error messages to the coordinate calculation function
    let coordsMap = calculateCoordinates(invalidType, modifiedObjects, canvasW, canvasH)

    // console.log("Interface 15: ", coordsMap)
    return [modifiedObjects, coordsMap]
}

// return a list of parsed objects and a coordinate map that maps nodes to coordinates
export function getObjectsAndCoords(inputStr, canvasW, canvasH) {
    return getCoords(parse(inputStr), canvasW, canvasH)
}
