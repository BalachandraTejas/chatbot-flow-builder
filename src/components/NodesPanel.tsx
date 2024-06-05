import React from "react";
import chatIcon from "../assets/bubble-chat.png";

export default function NodesPanel({ nodeType }) {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="conponent-type"
      draggable="true"
      onDragStart={(event) => onDragStart(event, nodeType.type)}
    >
      <img src={chatIcon} alt={nodeType.type} />
      <div>
        {nodeType.type.charAt(0).toUpperCase()}
        {nodeType.type.slice(1)}
      </div>
    </div>
  );
}
