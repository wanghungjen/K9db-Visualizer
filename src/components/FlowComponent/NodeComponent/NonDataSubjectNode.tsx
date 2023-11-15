import React from "react";
import { Handle, NodeProps, Position } from "reactflow";
import "./node.css";

export default function NonDataSubjectnode({ data }: NodeProps) {
  return (
    <>
      <Handle
        id="own"
        type="source"
        position={Position.Top}
        style={{ background: "transparent", border: "transparent" }}
        isConnectable={false}
      />
      <div className="datasubjectnode">{data.label}</div>

      <Handle
        id="own"
        type="target"
        position={Position.Bottom}
        style={{ background: "transparent", border: "transparent" }}
        isConnectable={false}
      />
    </>
  );
}
