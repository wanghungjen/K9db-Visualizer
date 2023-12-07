import React, { useState } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import "./node.css";

export default function NonDataSubjectnode({ data }: NodeProps) {
  const [isShown, setIsShown] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      <Handle
        id="own"
        type="source"
        position={Position.Top}
        style={{ background: "transparent", border: "transparent" }}
        isConnectable={false}
      />

      <div className="wrapper">
        {data.valid === true ? (
          <div className="datasubjectnode">{data.label} </div>
        ) : (
          <div className="datasubjectnode" style={{ background: "#F05941" }}>
            {data.label}{" "}
          </div>
        )}
        {isShown && (
          <div className="popupp">
            {data.warningMsg.map((x) => (
              <div>{x}</div>
            ))}
          </div>
        )}
      </div>

      <Handle
        id="own"
        type="target"
        position={Position.Bottom}
        style={{ background: "transparent", border: "transparent" }}
        isConnectable={false}
      />
    </div>
  );
}
