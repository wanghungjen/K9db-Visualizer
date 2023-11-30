import React from "react";
import { Handle, NodeProps, Position } from "reactflow";
import "./node.css";

export default function DataSubjectNode({ data }: NodeProps) {
  return (
    <>
      <Handle
        id="own"
        type="source"
        position={Position.Top}
        style={{ background: "transparent", border: "transparent" }}
        isConnectable={false}
      />
      {data.valid === true ? (
        <div className="datasubjectnode">{data.label} </div>
      ) : (
        <div className="datasubjectnode"  style={{background:"#F05941"}}>{data.label} </div>
      )}

      <Handle
        type="target"
        position={Position.Bottom}
        style={{ background: "transparent", border: "transparent" }}
        isConnectable={false}
      />
    </>
  );
}
