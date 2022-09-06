import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";

function Messages() {
  const { messages, username, ...chat } = useSelector((state) => state.chat);

  const messagesEl = useRef(null);

  const renderMessages = () => {
    return messages.map(([msgUsername, message]) => (
      <Message
        key={message.length + username.length * Math.random() * 5}
        username={msgUsername}
        alignment={msgUsername === username ? "left" : "right"}
      >
        {message}
      </Message>
    ));
  };

  // keeps chat feed at the latest chat
  useEffect(() => {
    if (messages) {
      const messagesObserver = new MutationObserver(
        (mutationList, observer) => {
          mutationList.forEach((mutation) => {
            if (mutation.type === "childList") {
              mutation.target.scroll({
                top: mutation.target.scrollHeight,
                behavior: "smooth",
              });
            }
          });
        }
      );
      messagesObserver.observe(messagesEl.current, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    }
  }, []);

  return (
    <div className="messages" ref={messagesEl}>
      {renderMessages()}
    </div>
  );
}

export default Messages;
