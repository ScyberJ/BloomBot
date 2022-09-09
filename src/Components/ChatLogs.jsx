import "../css/ChatLogs.css";
import ChatLog from "./ChatLog";
import NewChat from "./NewChat";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";

function ChatLogs() {
  const [isCreateChatVisisble, setIsCreateChatVisisble] = useState(false);
  const chats = useSelector((state) => state.chatLog.chats);

  const renderChatLogs = () => {
    return chats.map(({ id, username, botname, messages }, ind) => (
      <ChatLog
        key={id + Math.floor(Math.random() * 10)}
        id={id}
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
