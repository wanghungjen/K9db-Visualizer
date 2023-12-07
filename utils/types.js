export const Annotations = {
    DataSubject: "data_subject",
    NonDataSubject: "non_data_subject",
    OwnedBy: "owned_by",
    AccessedBy: "accessed_by",
    Owns: "owns",
    Accesses: "accesses"
}

// what type of problem does the graph have
export const InvalidGraphTypes = Object.freeze({
    None: "None",
    Cycle: "Cycle",
    NonDataSubjectEdge: "NonDataSubjectEdge",
})

export function isEdgeObject(object) {
    let edgeAnnotations = [Annotations.OwnedBy, Annotations.AccessedBy, 
                            Annotations.Owns, Annotations.Accesses]
    return edgeAnnotations.includes(object.annotation)
}

export function isDataSubject(object) {
    return object.annotation === Annotations.DataSubject
}

export function isNodeObject(object) {
    let nodeAnnotations = [Annotations.NonDataSubject, Annotations.DataSubject]
    return nodeAnnotations.includes(object.annotation)
}

// check if an edge is a problematic edge
export function hasErrorMsg(object) {
    return isEdgeObject(object) && "errorMsg" in object && 
            object["errorMsg"].length > 0
}