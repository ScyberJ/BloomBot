import React from "react";
import "../css/Message.css";

function Message({ username, children, alignment }) {
  return (
    <div
      style={{ alignItems: alignment === "left" ? "start" : "end" }}
      className="message"
    >
      <span style={{ textAlign: alignment }} className="username">
        {username}
      </span>
      <p className="message-text">{children}</p>
    </div>
  );
}

export default Message;
