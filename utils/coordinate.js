import { InvalidGraphTypes, hasErrorMsg, isEdgeObject } from "./types.js"
import { topoSort, getGraphFromObjects } from './graph.js';


// when the graph is valid, arrange nodes level by level
function getValidGraphCoords(objects, canvasW, canvasH) {
    let sortedNodes = topoSort(objects).reverse()
    // calculate the height assigned to each level
    var heightPerLevel = canvasH / sortedNodes.length

    var coords = {}
    // for each level
    for (let i = 0; i < sortedNodes.length; i++) {
        var widthPerNode = canvasW / sortedNodes[i].length
        var currY = i * heightPerLevel + heightPerLevel / 2
        // for each node in this level
        for (let j = 0; j < sortedNodes[i].length; j++) {
            let nodeName = sortedNodes[i][j]
            coords[nodeName] = {
                "tableName": nodeName,
                posX: j * widthPerNode + widthPerNode / 2,
                posY: currY
            }
        }
    }
    return coords
}

// put nodes in the cycle at the top and all other nodes down below
function getCycleGraphCoords(objects, canvasW, canvasH) {
    function getCycleAndNonCycleNodes() {
        // get nodes that are not in the cycle
        let G = getGraphFromObjects(objects)
        let nonCycleNodes = new Set(Object.keys(G))
        let firstCycleObj
        for (const obj of objects) {
            if (isEdgeObject(obj) && hasErrorMsg(obj)) {
                nonCycleNodes.delete(obj.from)
                firstCycleObj = obj
            }
        }
        nonCycleNodes = [...nonCycleNodes]
        // loop around the cycle till we meet the first cycle node again
        // to get node in the cycle
        let nameObjMap = {}
        for (const obj of objects) {
            if (isEdgeObject(obj)) {
                nameObjMap[obj.from] = obj
            }
        }
        let cycleNodes = []
        let currObj = firstCycleObj
        do {
            cycleNodes.push(currObj.from)
            currObj = nameObjMap[currObj.to]

        } while (currObj.from !== firstCycleObj.from) 

        return [nonCycleNodes, cycleNodes]
    }

    let [nonCycleNodes, cycleNodes] = getCycleAndNonCycleNodes()
    let coords = {}
    // non-cycle nodes are put in the bottom 1/4 of the region
    let nonCycleY = canvasH - canvasH * 0.125
    let leftBuffer = canvasW / (nonCycleNodes.length * 2)
    let xDelta = leftBuffer * 2
    for (let i = 0; i < nonCycleNodes.length; i++) {
        let node = nonCycleNodes[i]
        coords[node] = {
            "tableName": node,
            "posX": leftBuffer + xDelta * i,
            "posY": nonCycleY
        }
    }


    // cycle nodes are put at the top 3/4 of the region
    // nodes are evenly distribute on 4 sides on the box
    // If there are 2 nodes, the number of nodes put on each side is [1, 1, 0, 0]
    // For 7 nodes, [2, 2, 2, 1]
    let [centerX, centerY] = [canvasW / 2, canvasH * 0.75 / 2]
    let radius = Math.min(canvasH * 0.75 / 2, canvasW / 2)
    let radianPerNode = 2 * Math.PI / cycleNodes.length
    for (let i = 0; i < cycleNodes.length; i++) {
        let node = cycleNodes[i]
        let radians = i * radianPerNode
        coords[node] = {
            "tableName": node,
            "posX": centerX + radius * Math.cos(radians),
            "posY": centerY + radius * Math.sin(radians),
        }
    }
    return coords
}

// Return a hashmap that maps table names to coordinates.
// The coordinates indicate the center positions of nodes
export function calculateCoordinates(invalidType, objects, canvasW, canvasH) {
    // check invalid type and decide how to place nodes accordingly
    switch(invalidType) {
        case InvalidGraphTypes.None:
            return getValidGraphCoords(objects, canvasW, canvasH)
        case InvalidGraphTypes.Cycle:
            return getCycleGraphCoords(objects, canvasW, canvasH)
        default:
            console.assert(false, "Invalid type is not supported yet: ", invalidType)
            return undefined
    }
}