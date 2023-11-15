// Graph API's
export function getGraph(parsedObjects) {
    const nodes = new Set()
    var edges = []
    for (const obj of parsedObjects) {
        if (obj.annotation === "data_subject") {
            nodes.add(obj.tableName)
        } else {
            nodes.add(obj.from)
            nodes.add(obj.to)
            edges.push(obj)
        }
    }

    // create an adjacency list
    const G = {};
    for (const node of nodes) {
        // G.set(node, new Set())
        G[node] = new Set()
    }
    for (const edge of edges) {
        G[edge.to].add(edge.from)
    }
    return G
}


/* Given a set of unique nodes and a list of edges objects, return a list of
lists of nodes like res = [[A], [B, C], [D]] where A (data subject) has 
inDegree 0, B and C have inDegree 1 and D has inDegree 2.
If the graph is invalid (has a cycle), returns an empty list */
export function topoSort(G) {
    // create an inNodes graph (reverse graph) from the input graph
    const inNodes = {};
    for (const node in G) {
        inNodes[node] = new Set()
    }
    for (const fromNode in G) {
        for (const toNode of G[fromNode]) {
            inNodes[toNode].add(fromNode)
        }
    }
    // 2. get all nodes that have zero dependencies
    var q = []
    for (const node in inNodes) {
        if (inNodes[node].size === 0) {
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
                inNodes[neighbor].delete(curr)
                if (inNodes[neighbor].size === 0) {
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