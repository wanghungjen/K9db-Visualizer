import { isNodeObject } from "./types.js"

// dependencyGraphGraph; for a node, store what other nodes the current one depends on
function getDependencyGraph(parsedObjects) {
    const nodeSet = new Set()
    var edges = []
    for (const obj of parsedObjects) {
        if (isNodeObject(obj)) {
            nodeSet.add(obj.tableName)
        } else {
            nodeSet.add(obj.from)
            nodeSet.add(obj.to)
            edges.push(obj)
        }
    }

    // create an adjacency list
    const G = {};
    for (const node of nodeSet) {
        // G.set(node, new Set())
        G[node] = new Set()
    }
    for (const edge of edges) {
        G[edge.to].add(edge.from)
    }
    return G
}

// what neighbors can the current node travel to
function getGraph(dependencyGraph) {
    const G = {};
    for (const node in dependencyGraph) {
        G[node] = new Set()
    }
    for (const fromNode in G) {
        for (const toNode of dependencyGraph[fromNode]) {
            G[toNode].add(fromNode)
        }
    }
    return G
}

export function getGraphFromObjects(objects) {
    return getGraph(getDependencyGraph(objects))
}

/* Given a set of unique nodes and a list of edges objects, return a list of
lists of nodes like res = [[A], [B, C], [D]] where A (data subject) has 
inDegree 0, B and C have inDegree 1 and D has inDegree 2.
If the graph is invalid (has a cycle), returns an empty list */
export function topoSort(parsedObjects) {
    let dependencyGraph = getDependencyGraph(parsedObjects)
    let G = getGraph(dependencyGraph)

    // 2. get all nodes that have zero dependencies
    var q = []
    for (const node in dependencyGraph) {
        if (dependencyGraph[node].size === 0) {
            q.push(node)
        }
    }

    // 3. use Khan's algorithm to construct the result array
    const res = []
    var processedNodeCt = 0
    while (q.length > 0) {
        var nextQ = []
        for (const curr of q) {
            processedNodeCt++
            for (const neighbor of G[curr]) {
                dependencyGraph[neighbor].delete(curr)
                if (dependencyGraph[neighbor].size === 0) {
                    nextQ.push(neighbor)
                }
            }
        }
        res.push(q)
        q = nextQ
    }
    // 4. returns processed node in topological order; 
    // If there's a cycle, only return nodes that are not in the cycle
    return res
}

// Given a list of edge/node objects, return a list of all unique nodes
export function getAllNodes(parsedObjects) {
    const nodeSet = new Set()
    for (const obj of parsedObjects) {
        if (isNodeObject(obj)) {
            nodeSet.add(obj.tableName)
        } else {
            nodeSet.add(obj.from)
            nodeSet.add(obj.to)
        }
    }
    return [...nodeSet]
}