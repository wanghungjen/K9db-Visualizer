import { parse } from "./parse.js"
import { calculateCoordinates } from './coordinate.js'
import { validate } from "./validate.js"

// return a list of parsed objects and a coordinate map that maps nodes to coordinates
export function getCoords(parsedObjects, canvasW, canvasH) {
    // 1. Build a graph and validate if the graph is valid.
    // If not, the `errMsg` will be added to problem edges
    let [invalidType, modifiedObjects] = validate(parsedObjects)
    console.log("Interface 10: ", invalidType, modifiedObjects)

    // 2. Pass objects with potentially error messages to the coordinate calculation function
    let coordsMap = calculateCoordinates(invalidType, modifiedObjects, canvasW, canvasH)

    console.log("Interface 15: ", coordsMap)
    return [modifiedObjects, coordsMap]
}

// return a list of parsed objects and a coordinate map that maps nodes to coordinates
export function getObjectsAndCoords(inputStr, canvasW, canvasH) {
    return getCoords(parse(inputStr), canvasW, canvasH)
}
