import "../css/Chat.css";
import ChatBar from "./ChatBar";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useState } from "react";

function Chat() {
  const [userMessages, setUserMessages] = useState([]);

  return (
    <div className="chat-container">
      <ChatBar setUserMessages={setUserMessages} />
      <Messages />
      <MessageInput
        userMessages={userMessages}
        setUserMessages={setUserMessages}
      />
    </div>
  );
}

export default Chat;
