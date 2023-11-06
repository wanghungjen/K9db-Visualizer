import parse from './parse.js';
import { getGraph, topoSort } from './graph.js';
import { calculateCoordinates } from './coordinate.js'
import {lobstersStatements} from './statements.js'

// get graph and topologically-sorted nodes
var parsedObjects = parse(lobstersStatements)
console.log(parsedObjects)
var graph = getGraph(parsedObjects)
var sortedNodes = topoSort(graph)
console.log(graph)
console.log(sortedNodes)

// calculate coordinates
var canvasWidth = 1000
var canvasHeight = 1000
var coords = calculateCoordinates(sortedNodes, graph, canvasWidth, canvasHeight)
console.log(coords)
