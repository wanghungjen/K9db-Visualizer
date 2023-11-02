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
        style={{ left: 20, background: "transparent", border: "transparent" }}
        isConnectable={false}
      />
      <Handle
        id="access"
        type="source"
        position={Position.Top}
        style={{
          right: 20,
          left: "auto",
          background: "transparent",
          border: "transparent",
        }}
        isConnectable={false}
      />
      <div className="datasubjectnode">{data.label}</div>

      <Handle
        id="own"
        type="target"
        position={Position.Bottom}
        style={{ left: 20, background: "transparent", border: "transparent" }}
        isConnectable={false}
      />
      <Handle
        id="access"
        type="target"
        position={Position.Bottom}
        style={{
          right: 20,
          left: "auto",
          background: "transparent",
          border: "transparent",
        }}
        isConnectable={false}
      />
    </>
  );
}
