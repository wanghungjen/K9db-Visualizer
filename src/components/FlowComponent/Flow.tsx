import React from "react";
import "reactflow/dist/style.css";
import ReactFlow, {
  MiniMap,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import ControlPanel from "./ControlPanelComponent/ControlPanel";

import Nodes from "./Nodes.js";
import Edges from "./Edges.js";
import OwnsEdge from "./EdgeComponent/OwnsEdge";
import OwnedByEdge from "./EdgeComponent/OwnedByEdge";
import AccessesEdge from "./EdgeComponent/AccessesEdge";
import AccessedByEdge from "./EdgeComponent/AccessedByEdge";
import DataSubjectNode from "./NodeComponent/DataSubjectNode";
import NonDataSubjectNode from "./NodeComponent/NonDataSubjectNode";

const edgeTypes = {
  ownsedge: OwnsEdge,
  ownedbyedge: OwnedByEdge,
  accessesedge: AccessesEdge,
  accessedbyedge: AccessedByEdge,
};

const nodeTypes = {
  datasubjectnode: DataSubjectNode,
  nondatasubjectnode: NonDataSubjectNode,
};

const Flow = ({
  handleParsedSchema,
  parsedDataSubject,
  parsedEdges,
  parsedOtherTables,
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    Nodes(parsedDataSubject, parsedOtherTables)
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(Edges(parsedEdges));

  const handleStateChange = (dataSubject, otherTables, edges) => {
    setNodes(Nodes(dataSubject, otherTables));
    setEdges(Edges(edges));
  };

  return (
    <div style={{ width: "100vw", height: "100vh", alignSelf: "center" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        snapToGrid={true}
        fitView
        attributionPosition="top-right"
      >
        <ControlPanel
          handleParsedSchema={handleParsedSchema}
          handleStateChange={handleStateChange}
        />
        <MiniMap
          nodeColor={(n) => {
            if (n.type === "datasubjectnode") return "#423E37";
            return "#eee";
          }}
        />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default Flow;
