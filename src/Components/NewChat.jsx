import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/NewChat.css";
import { setBotname, setUsername } from "../Features/chat/chatSlice";
import { addChat } from "../Features/chatLog/chatLogSlice";

function NewChat({ isVisible, setIsVisible }) {
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat);

  const usernameInput = useRef(null);
  const botnameInput = useRef(null);

  const onClickHandler = () => {
    if (usernameInput.current.value)
      dispatch(setUsername(usernameInput.current.value));
    if (botnameInput.current.value)
      dispatch(setBotname(botnameInput.current.value));
    dispatch(addChat(chat));
    setIsVisible(!isVisible);
  };

  return (
    <div
      style={isVisible ? { display: "block" } : { display: "none" }}
      className="new-chat-container"
    >
      <h1 className="new-chat-title">Create Chat</h1>
      <div className="new-chat-inputs">
        <input type="text" ref={usernameInput} placeholder="Enter Username" />
        <input type="text" ref={botnameInput} placeholder="Enter Botname" />
      </div>
      <br />
      <button onClick={onClickHandler}>Create</button>
    </div>
  );
}

export default NewChat;
