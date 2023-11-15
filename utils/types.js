export const Annotations = {
    DataSubject: "data_subject",
    OwnedBy: "owned_by",
    AccessedBy: "accessed_by",
    Owns: "owns",
    Accesses: "accesses"
}

export function isEdgeObject(object) {
    return object.annotation !== Annotations.DataSubject
}

// what type of problem does the graph have
export const InvalidGraphTypes = Object.freeze({
    None: "None",
    Cycle: "Cycle",
    NoDataSubject: "NoDataSubject",
    MultipleDataSubjects: "MultipleDataSubjects",
    DataSubjectOutEdge: "DataSubjectOutEdge"
})