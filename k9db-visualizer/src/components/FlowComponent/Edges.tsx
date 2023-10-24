import { MarkerType } from "reactflow";

const ownsMarkerEnd = {
  type: MarkerType.ArrowClosed,
  width: 18,
  height: 20,
};

const ownedbyMarkerEnd = {
  type: MarkerType.ArrowClosed,
  width: 18,
  height: 20,
};

const accessesMarkerEnd = {
  type: MarkerType.ArrowClosed,
  width: 18,
  height: 20,
};

const accessedbyMarkerEnd = {
  type: MarkerType.ArrowClosed,
  width: 18,
  height: 20,
};

const edgeStyle = {
  strokeWidth: 1.2,
};

const Edges = () => {
  return [
    {
      id: "edges-e1-2",
      source: "1",
      target: "2",
      type: "ownsedge",
      markerEnd: ownsMarkerEnd,
      style: edgeStyle,
    },
    {
      id: "edges-e2-2a",
      source: "2",
      target: "3",
      type: "ownedbyedge",
      markerEnd: ownedbyMarkerEnd,
      style: edgeStyle,
    },
    {
      id: "edges-e2-3",
      source: "2",
      target: "4",
      type: "accessesedge",
      markerEnd: accessesMarkerEnd,
      style: edgeStyle,
    },
    {
      id: "edges-e3-4",
      source: "4",
      target: "5",
      type: "accessedbyedge",
      markerEnd: accessedbyMarkerEnd,
      style: edgeStyle,
    },
  ];
};

export default Edges;
