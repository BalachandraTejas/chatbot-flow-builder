import React, { useState } from "react";
import { Edge, Node } from "reactflow";

export default function TopBar({ readEdges, readNodes }) {
  const [toastMsg, setToastMsg] = useState({ msgText: "", msgState: "" });

  const isMoreThanOneEmptyTargetHandle = (
    edges: Edge[],
    nodes: Node[]
  ): Boolean => {
    const nodeIds = nodes.map((node) => node.id);
    const uniqueSet = new Set(edges.map((edge) => edge.target));
    const nodesWithTargetEdge = [...uniqueSet];
    return nodeIds.length - nodesWithTargetEdge.length > 1;
  };

  const handleSave = () => {
    console.log(readEdges, readNodes);
    // check if more than one nodes && more than one nodes has empty target handles
    if (
      readNodes.length > 1 &&
      isMoreThanOneEmptyTargetHandle(readEdges, readNodes)
    ) {
      setToastMsg({ msgText: "Cannot save Flow", msgState: "" });
    } else {
      setToastMsg({ msgText: "Save Successful", msgState: "success" });
    }
    setTimeout(() => setToastMsg({ msgText: "", msgState: "" }), 2000);
  };

  return (
    <div className="topbar">
      <div className="top-toast-panel">
        {toastMsg.msgText !== "" && (
          <span
            style={
              toastMsg.msgState === "success"
                ? { backgroundColor: "#adebad" }
                : { backgroundColor: "#FACCCB" }
            }
          >
            {toastMsg.msgText}
          </span>
        )}
      </div>
      <div className="top-side-panel">
        <button className="btn-save" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
