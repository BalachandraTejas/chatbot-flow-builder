import React, { useState } from "react";
import { EMPTY_NODE } from "./constants";
import arrow from "../assets/arrow.png";

export default function SettingsPanel({
  nodeText,
  setNodeText,
  selectedNode,
  setSelectedNode,
}) {
  const handleMsgChange = (e) => {
    setNodeText(e.target.value);
  };

  return (
    <div className="settings-panel">
      <div className="settings-panel-header">
        <img
          src={arrow}
          alt="back button"
          onClick={() => setSelectedNode(EMPTY_NODE)}
        />
        <span>
          {selectedNode.type.charAt(0).toUpperCase() +
            selectedNode.type.slice(1)}
        </span>
        <span></span>
      </div>
      <div className="settings-panel-body">
        <div className="text-label">Text</div>
        <textarea
          id="text"
          name="text"
          rows={4}
          value={nodeText}
          onChange={handleMsgChange}
        ></textarea>
      </div>
    </div>
  );
}
