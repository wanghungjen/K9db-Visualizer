import { getAllNodes, getDependencyGraph, topoSort } from './graph.js';
import { isEdgeObject, InvalidGraphTypes, isDataSubject } from "./types.js"

/* Detect if there's a cycle in the graph. If there's a cycle,
add error messages to all edges that belong to this cycle.
Because every node has at most one outgoing edge, any node that hasn't 
been visited after Khan's algorithm is in the cycle, and this node must
have one and only one outgoing edge that's in the cycle.

returns true to indicate there's a cycle; edge object in a cycle will have errMsg added
*/
function detectCycle(parsedObjects) {
    // map fromNodes to edge objects
    let fromNodeMap = {}
    let resObjects = []
    for (const obj of parsedObjects) {
        if (isEdgeObject(obj)) {
            fromNodeMap[obj.from] = obj
        } else {
            // non-edge objects will be added to the result 
            resObjects.push(obj)
        }
    }
    // get the set of nodes that are not in the cycle
    let topoSortedList = topoSort(parsedObjects)
    let nonCycleSet = new Set()
    for (const level of topoSortedList) {
        for (const node of level) {
            nonCycleSet.add(node)
        }
    }

    let allNodes = getAllNodes(parsedObjects)
    let hasCycle = false
    for (const node of allNodes) {
        let obj = fromNodeMap[node]
        if (!nonCycleSet.has(node)) {
            // add the cycle error message to the object corresponding to this node
            hasCycle = true
            obj["errorMsg"] = "This edge is in a cycle"
        }
        resObjects.push(obj)
    }

    return [hasCycle, resObjects]
}

// edges that don't eventually flow to a data subject are invalid
function detectInvalidEdges(parsedObjects) {
    let dataSubjectNodes = new Set()
    for (const obj of parsedObjects) {
        if (isDataSubject(obj)) {
            dataSubjectNodes.add(obj.tableName)
        }
    }

    // do a dfs traversal starting from each data subject node to find out
    // which nodes can eventually reach to a data subject node
    let visited = new Set()
    let dependencyGraph = getDependencyGraph(parsedObjects)
    function dfs(curr) {
        visited.add(curr)
        for (const neighbor of dependencyGraph[curr]) {
            if (!visited.has(neighbor)) {
                dfs(neighbor)
            }
        }
    }
    for (const node of dataSubjectNodes) {
        if (!visited.has(node)) {
            dfs(node)
        }
    }
    // iterate through all edges and check if the to table is a visited node
    let hasInvalidEdge = false
    for (let obj of parsedObjects) {
        if (isEdgeObject(obj) && !visited.has(obj.to)) {
            hasInvalidEdge = true
            obj["errorMsg"] = "This edge doesn't eventually point to a data subject node"
        }
    }
    return [hasInvalidEdge, parsedObjects]
}


// Given a list of parsed objects (edge objects and node objects)
// return a list of objects with potential error messages added to the objects
export function validate(parsedObjects) {
    // 1. Check if any cycle exists
    let [hasError, modifiedObjects] = detectCycle(parsedObjects)
    if (hasError) {
        return [InvalidGraphTypes.Cycle, modifiedObjects]
    }

    // 2. Check if any edge doesn't eventually flow to a data-subject node
    [hasError, modifiedObjects] = detectInvalidEdges(parsedObjects)
    if (hasError) {
        return [InvalidGraphTypes.NonDataSubjectEdge, modifiedObjects]
    }

    // no error; original parsedObjects are returned
    return [InvalidGraphTypes.None, parsedObjects]
}