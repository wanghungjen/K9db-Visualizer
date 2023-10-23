import React, { useCallback } from "react";
import "reactflow/dist/style.css";
import ReactFlow, {
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import ControlPanel from "./ControlPanelComponent/ControlPanel";

import initialNodes from "./Nodes.js";
import initialEdges from "./Edges.js";
import OwnsEdge from "./EdgeComponent/OwnsEdge";

const edgeTypes = {
  ownsedge: OwnsEdge,
};


const Flow = () => {

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div style={{ width: "100vw", height: "100vh", alignSelf: "center" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        snapToGrid={true}
        fitView
        attributionPosition="top-right"
      >
        <ControlPanel />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default Flow;
