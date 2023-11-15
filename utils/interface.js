import { parse } from "./parse.js"
import { getGraph, topoSort } from './graph.js';
import { calculateCoordinates } from './coordinate.js'
import { validate } from "./validate.js"


export default function getObjectsAndCoords(inputStr, canvasW, canvasH) {
    // 1. Parse the input string to a list of node or edge objects
    let parsedObjects = parse(inputStr)

    // 2. Build a graph and validate if the graph is valid.
    // If not, the `errMsg` will be added to problem edges
    let [invalidType, modifiedObjects] = validate(parsedObjects)

    // 3. Pass objects with potentially error messages to the coordinate calculation function
    let coordsMap = calculateCoordinates(invalidType, modifiedObjects, canvasW, canvasH)

    return [modifiedObjects, coordsMap]
}
