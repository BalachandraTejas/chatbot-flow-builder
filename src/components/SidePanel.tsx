import React from "react";
import { NodeType } from "./types";

import SettingsPanel from "./SettingsPanel";
import NodesPanel from "./NodesPanel";

export default function SidePanel({
  nodeText,
  setNodeText,
  customNodeTypes,
  selectedNode,
  setSelectedNode,
}) {
  return (
    <div className="app-sidepanel">
      {selectedNode && selectedNode.id !== "" && (
        <SettingsPanel
          nodeText={nodeText}
          setNodeText={setNodeText}
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
        />
      )}
      {selectedNode &&
        selectedNode.id === "" &&
        customNodeTypes &&
        customNodeTypes.map((nodeType: NodeType) => (
          <NodesPanel key={nodeType.id} nodeType={nodeType} />
        ))}
    </div>
  );
}
