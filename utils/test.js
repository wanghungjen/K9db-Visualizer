import { getObjectsAndCoords } from './interface.js';
import * as statements from './statements.js'

let canvasWidth = 1000
let canvasHeight = 1000

// test lobstersStatements
let [objects, coordsMap] = getObjectsAndCoords(statements.lobstersStatements, canvasWidth, canvasHeight)

// test cycles of two nodes
// let [objects, coordsMap] = getObjectsAndCoords(statements.twoNodesCycle1, canvasWidth, canvasHeight)
// let [objects, coordsMap] = getObjectsAndCoords(statements.twoNodesCycle2, canvasWidth, canvasHeight)

// test cycles of three nodes
// let [objects, coordsMap] = getObjectsAndCoords(statements.threeNodesCycle, canvasWidth, canvasHeight)
// console.log(objects)
// console.log(coordsMap)