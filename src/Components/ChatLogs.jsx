import React from "react";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import ChatLog from "./ChatLog";

function ChatLogs() {
  const chats = useSelector((state) => state.chatLog.chats);

  return (
    <div className="chat-log">
      <h1>Chats</h1>
      <button>
        <FaPlus />
      </button>
      <hr />
      {chats.map(({ username, botname, messages }, ind) => (
        <ChatLog
          key={username + ind}
          title={botname}
          body={messages[messages.length - 1]}
        />
      ))}
    </div>
  );
}

export default ChatLogs;
