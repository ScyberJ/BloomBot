import React from "react";
import Messages from "./Messages";
import Navbar from "./Navbar";
import MessageInput from "./MessageInput";
import ChatBar from "./ChatBar";

function Chat() {
  return (
    <div className="chat-container">
      <ChatBar />
      <Messages />
      <MessageInput />
    </div>
  );
}

export default Chat;
