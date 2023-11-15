import getObjectsAndCoords from './interface.js';
import { lobstersStatements, ownCloudStatements } from './statements.js'

let canvasWidth = 1000
let canvasHeight = 1000

// test lobstersStatements
let [objects, coordsMap] = getObjectsAndCoords(lobstersStatements, canvasWidth, canvasHeight)
console.log(objects)
console.log(coordsMap)