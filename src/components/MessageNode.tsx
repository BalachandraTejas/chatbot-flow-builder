import React from "react";
import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import chatIcon from "../assets/bubble-chat.png";
import whatsAppImg from "../assets/32px-WhatsApp_icon.png";
import SourceHandle from "./SourceHandle";

export default function MessageNode({ data }) {
  return (
    <div className="message-node">
      <Handle type="target" position={Position.Left} />
      <div>
        <div className="message-header">
          <span>
            <img className="chat-icon" alt="chat-icon" src={chatIcon} />
            Send Message
          </span>
          <span className="whatsapp-icon">
            <img alt="whatsapp-icon" src={whatsAppImg} />
          </span>
        </div>
        <div className="message-text">{data.label}</div>
      </div>
      <SourceHandle type="source" position={Position.Right} isConnectable={1} />
    </div>
  );
}
