import React from "react";
import { Handle, NodeProps, Position } from "reactflow";
import "./node.css";

export default function DataSubjectNode({ data }: NodeProps) {
  return (
    <>
      <div className="datasubjectnode">{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#555" }}
        isConnectable={false}
      />
    </>
  );
}
