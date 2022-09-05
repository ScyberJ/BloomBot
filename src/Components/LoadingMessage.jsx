import React from "react";
import Message from "./Message";

function LoadingMessage({ username, alignment }) {
  return (
    <Message username={username} alignment={alignment}>
      Loading...
    </Message>
  );
}

export default LoadingMessage;
