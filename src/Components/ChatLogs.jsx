import "../css/ChatLogs.css";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import ChatLog from "./ChatLog";
import NewChat from "./NewChat";
import { useState } from "react";

function ChatLogs() {
  const [isCreateChatVisisble, setIsCreateChatVisisble] = useState(false);
  const chats = useSelector((state) => state.chatLog.chats);

  const renderChatLogs = () => {
    console.log(chats);
    return chats.map(({ username, botname, messages }, ind) => (
      <ChatLog
        key={username + ind}
        title={botname}
        body={messages[messages.length - 1]}
      />
    ));
  };

  const toggleCreateChat = () => {
    setIsCreateChatVisisble(!isCreateChatVisisble);
  };

  return (
    <div className="chat-logs">
      <div className="chat-logs-header">
        <h1>Chats</h1>
        <button onClick={toggleCreateChat}>
          <FaPlus />
        </button>
        <NewChat
          isVisible={isCreateChatVisisble}
          setIsVisible={setIsCreateChatVisisble}
        />
      </div>
      <hr />
      {renderChatLogs()}
    </div>
  );
}

export default ChatLogs;
