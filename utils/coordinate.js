// height between two levels is roughly 100 px's
var MAXNODEWIDTH = 200
var MAXNODEHEIGHT = 30


// Given the top-left coordinate of the sub-canvas and its width and height,
// calculate the top-left coordinate of the node. Assume that the sub-canvas will 
// always be larger than the node
function topLeftAlign(centerX, centerY, nodeW, nodeH) {
    return [centerX - nodeW / 2, centerY / nodeH / 2]
}

// Return a hashmap that maps table names to coordinates.
// The coordinates indicate the center positions of nodes
export function calculateCoordinates(sortedNodes, G, canvasW, canvasH) {
    var coords = new Map()

    // calculate the height assigned to each level
    var heightPerLevel = canvasH / sortedNodes.length

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