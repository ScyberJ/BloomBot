import "../css/ChatBar.css";
import React from "react";
import { useSelector } from "react-redux";
import { clearMessages } from "../Features/chat/chatSlice";
import { FaTrash } from "react-icons/fa";

function ChatBar() {
  const botname = useSelector((state) => state.chat.botname);

  const clear = () => {
    dispatch(clearMessages());
    // userMessages = [];
  };

  return (
    <div className="chat-bar">
      <h2 className="chat-bar-title">{botname}</h2>
      <button className="btn-clear" onClick={clear}>
        <FaTrash />
      </button>
    </div>
  );
}

export default ChatBar;
