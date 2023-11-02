import React from "react";
import { Handle, NodeProps, Position } from "reactflow";
import "./node.css";

export default function DataSubjectNode({ data }: NodeProps) {
  return (
    <>
      <div className="datasubjectnode">{data.label}</div>
      <Handle
        type="target"
        position={Position.Bottom}
        style={{ background: "transparent", border: "transparent" }}
        isConnectable={false}
      />
    </>
  );
}
