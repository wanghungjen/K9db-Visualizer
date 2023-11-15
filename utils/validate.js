import { getGraph, topoSort } from './graph.js';
import { isEdgeObject, InvalidGraphTypes } from "./types.js"

/* Detect if there's a cycle in the graph. If there's a cycle,
add error messages to all edges that belong to this cycle.
Because every node has at most one outgoing edge, any node that hasn't 
been visited after Khan's algorithm is in the cycle, and this node must
have one and only one outgoing edge that's in the cycle.

returns true to indicate there's a cycle; edge object in a cycle will have errMsg added
*/
function detectCycle(G, parsedObjects) {
    console.log(parsedObjects)
    // map fromNodes to edge objects
    let fromNodeMap = {}
    let resObjects = []
    for (const obj of parsedObjects) {
        if (isEdgeObject(obj)) {
            fromNodeMap[obj.from] = obj
        } else {
            // non edge objects will be added to the result 
            resObjects.push(obj)
        }
    }
    // get the set of nodes that are not in the cycle
    let topoSortedList = topoSort(G)
    let nonCycleSet = new Set()
    for (const level of topoSortedList) {
        for (const node of level) {
            nonCycleSet.add(node)
        }
    }

    let allNodes = Object.keys(G)
    console.log(nonCycleSet, allNodes)
    for (const node of allNodes) {
        if (!nonCycleSet.has(node)) {
            // add the cycle error message to the object corresponding to this node
            console.log("Hi")
        }
    }
}

// Given a list of parsed objects (edge objects and node objects)
// return a list of objects with potential error messages added to the objects
export function validate(parsedObjects) {
    let G = getGraph(parsedObjects)

    // 1. Check if any cycle exists
    // let [hasCycle, modifiedObjects] = detectCycle(G, parsedObjects)
    // if (hasCycle) {
    //     return [InvalidGraphTypes.Cycle, modifiedObjects]
    // }

    // 2. TODO: Check if there's no data subject

    // 3. TODO: Check if there's more than one data subject

    // 4. TODO: Check if all edges flow to the data subject

    // no error; original parsedObjects are returned
    return [InvalidGraphTypes.None, parsedObjects]
}