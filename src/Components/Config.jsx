import React, { useRef, useState } from "react";
import { FaCog } from "react-icons/fa";
import { useDispatch } from "react-redux";
import "../css/Config.css";
import { setBotname, setUsername } from "../Features/chat/chatSlice";

function Config() {
  const dispatch = useDispatch();

  const usernameInput = useRef(null);
  const botnameInput = useRef(null);

  const onClickHandler = () => {
    if (usernameInput.current.value)
      dispatch(setUsername(usernameInput.current.value));
    if (botnameInput.current.value)
      dispatch(setBotname(botnameInput.current.value));
  };

  return (
    <div className="config-container">
      <h1 className="config-title">
        <FaCog /> Config
      </h1>
      <input type="text" ref={usernameInput} placeholder="Enter Username" />
      <input type="text" ref={botnameInput} placeholder="Enter Botname" />
      <br />
      <button onClick={onClickHandler}>Save</button>
    </div>
  );
}

export default Config;
