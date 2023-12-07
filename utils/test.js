import { getObjectsAndCoords } from './interface.js';
import * as statements from './statements.js'
import {getSussyColumns} from "./suggestion.js"
import {parse} from "./parse.js"
let canvasWidth = 1000
let canvasHeight = 1000

// test lobstersStatements
// let [objects, coordsMap] = getObjectsAndCoords(statements.lobstersStatements, canvasWidth, canvasHeight)

// test cycles of two nodes
// let [objects, coordsMap] = getObjectsAndCoords(statements.twoNodesCycle1, canvasWidth, canvasHeight)
let [objects, coordsMap] = getObjectsAndCoords(statements.twoNodesCycle2, canvasWidth, canvasHeight)

// test cycles of three nodes

let [objects, coordsMap] = getObjectsAndCoords(statements.sussyStatement)
console.log(objects)

// let test =`  CREATE TABLE messages (
//     id INT PRIMARY KEY, 
//     lastname text, 
//     sender INT NOT NULL OWNED_BY users(id), 
//     receiver INT NOT NULL OWNED_BY users(id), 
// );` 
// console.log(getSussyColumns(test))

// let [objects, coordsMap] = getObjectsAndCoords(statements.lobsterCompleteSchema, canvasWidth, canvasHeight)
// console.log(objects)
// console.log(coordsMap)

