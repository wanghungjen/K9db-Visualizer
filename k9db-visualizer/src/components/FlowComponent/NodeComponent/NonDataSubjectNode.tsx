import React from "react";
import { Handle, NodeProps, Position } from "reactflow";
import "./node.css";

export default function NonDataSubjectnode({ data }: NodeProps) {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#555" }}
        isConnectable={false}
      />
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
