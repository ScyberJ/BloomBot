import React from "react";

function ChatLog({ title, body }) {
  return (
    <div className="chat">
      <h1>{title}</h1>
      <span>{body}</span>
    </div>
  );
}

export default ChatLog;
