import React, { useCallback } from "react";
import MyControlButton from "./components/BoardComponent/ControlPanelComponent/MyControlButton";
import "./App.css";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ControlButton,
} from "reactflow";

import "reactflow/dist/style.css";
import ControlPanel from "./components/BoardComponent/ControlPanelComponent/ControlPanel";
import SplitPane from "react-split-pane";
import { resolveTypeReferenceDirective } from "typescript";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="rowC">
      <div>Pane 1 dfadfadfadsfadfads</div>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <ControlPanel />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>

    // <MyControlButton name="hey" />
  );
}
