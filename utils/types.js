export const Annotations = {
    DataSubject: "data_subject",
    OwnedBy: "owned_by",
    AccessedBy: "accessed_by",
    Owns: "owns",
    Accesses: "accesses"
}

// what type of problem does the graph have
export const InvalidGraphTypes = Object.freeze({
    None: "None",
    Cycle: "Cycle",
    NoDataSubject: "NoDataSubject",
    MultipleDataSubjects: "MultipleDataSubjects",
    DataSubjectOutEdge: "DataSubjectOutEdge"
})

export function isEdgeObject(object) {
    return object.annotation !== Annotations.DataSubject
}

// check if an edge is a problematic edge
export function hasErrorMsg(object) {
    return isEdgeObject(object) && "errorMsg" in object && 
            object["errorMsg"].length > 0
}