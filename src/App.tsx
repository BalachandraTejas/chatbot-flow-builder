import React, { useState } from "react";
import "reactflow/dist/style.css";
import FlowPanel from "./components/FlowPanel";
import SidePanel from "./components/SidePanel";
import TopBar from "./components/TopBar";
import "./App.css";
import { Node } from "reactflow";
import { EMPTY_NODE, NODE_TYPES } from "./components/constants";
import { NodeType } from "./components/types";

export default function App() {
  const [customNodeTypes, setCustomNodeTypes] =
    useState<NodeType[]>(NODE_TYPES);
  const [selectedNode, setSelectedNode] = useState<Node>(EMPTY_NODE);
  const [nodeText, setNodeText] = useState(selectedNode.data.label);
  const [readNodes, setReadNodes] = useState([]);
  const [readEdges, setReadEdges] = useState([]);

  return (
    <div>
      <TopBar readNodes={readNodes} readEdges={readEdges} />
      <div className="app-content">
        <FlowPanel
          nodeText={nodeText}
          setNodeText={setNodeText}
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
          setReadEdges={setReadEdges}
          setReadNodes={setReadNodes}
        />
        <SidePanel
          nodeText={nodeText}
          setNodeText={setNodeText}
          customNodeTypes={customNodeTypes}
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
        />
      </div>
    </div>
  );
}
