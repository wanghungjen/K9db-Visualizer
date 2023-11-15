import { MarkerType } from "reactflow";

export enum EdgeType {
  Owns = "owns",
  OwnedBy = "owned_by",
  Accesses = "accesses",
  AccessedBy = "accessed_by",
}

function getFlowEdgeType(e: EdgeType) {
  switch (e) {
    case EdgeType.Owns:
      return "ownsedge";
    case EdgeType.OwnedBy:
      return "ownedbyedge";
    case EdgeType.Accesses:
      return "accessesedge";
    case EdgeType.AccessedBy:
      return "accessedbyedge";
  }
}

function getHandleType(e: EdgeType) {
  switch (e) {
    case EdgeType.Owns:
    case EdgeType.OwnedBy:
      return "own";
    case EdgeType.Accesses:
    case EdgeType.AccessedBy:
      return "access";
  }
}

export const edgeStyle = {
  strokeWidth: 1.2,
};

const markerEnd = {
  type: MarkerType.ArrowClosed,
  width: 18,
  height: 20,
};

export function calculateOffset(numEdges: number): number[] {
  const offset = 60;
  const offsets = new Array<number>(numEdges);
  var low: number = 0;
  var high: number = numEdges - 1;
  var mid: number;
  if (numEdges % 2) {
    mid = (numEdges - 1) / 2;
    offsets[mid] = 0;
  } else {
    mid = numEdges / 2;
  }
  for (var i = 0; i < mid; i++) {
    offsets[low + i] = offset * (i + 1);
    offsets[high - i] = offset * -(i + 1);
  }
  return offsets;
}

export const initEdges = [
  {
    id: "edges-e1-2-1",
    source: "2",
    target: "1",
    type: "ownsedge",
    sourceHandle: "own",
    targetHandle: "own",
    markerEnd: markerEnd,
    style: edgeStyle,
    data: -60,
  },
  {
    id: "edges-e1-2-2",
    source: "2",
    target: "1",
    type: "ownsedge",
    sourceHandle: "own",
    targetHandle: "own",
    markerEnd: markerEnd,
    style: edgeStyle,
    data: 60,
  },
  {
    id: "edges-e2-2a",
    source: "3",
    target: "2",
    sourceHandle: "own",
    targetHandle: "own",
    type: "ownedbyedge",
    markerEnd: markerEnd,
    style: edgeStyle,
    data: -60,
  },
  {
    id: "edges-e2-3",
    source: "4",
    target: "2",
    sourceHandle: "access",
    targetHandle: "access",
    type: "accessesedge",
    markerEnd: markerEnd,
    style: edgeStyle,
    data: -60,
  },
  {
    id: "edges-e3-4",
    source: "5",
    target: "4",
    sourceHandle: "access",
    targetHandle: "access",
    type: "accessedbyedge",
    markerEnd: markerEnd,
    style: edgeStyle,
    data: 30,
  },
];

const Edges = function (edges: any[]) {
  if (edges.length === 0) {
    return initEdges;
  }

  const edgeMap = new Map();

  let ret: any[] = [];
  for (const e of edges) {
    var fromTo = e.from + "_" + e.to;
    if (!edgeMap.has(fromTo)) {
      edgeMap.set(fromTo, []);
    }
    edgeMap.get(fromTo).push(e);
  }

  edgeMap.forEach((value: any[], _: string) => {
    var numEdges = value.length;
    const posOffsets = calculateOffset(numEdges);
    for (var i = 0; i < value.length; i++) {
      var e = value[i];
      ret.push({
        id: e.from + "_" + e.annotation + "_" + e.edgeName,
        source: e.from,
        target: e.to,
        sourceHandle: getHandleType(e.annotation),
        targetHandle: getHandleType(e.annotation),
        type: getFlowEdgeType(e.annotation),
        markerEnd: markerEnd,
        style: edgeStyle,
        data: posOffsets[i],
      });
    }
  });
  return ret;
};

export default Edges;
