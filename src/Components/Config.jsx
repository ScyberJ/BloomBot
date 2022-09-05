import React, { useState } from "react";
import { FaCog } from "react-icons/fa";
import "../css/Config.css";

function Config({ setGlobalUsername }) {
  const [username, setUsername] = useState("");

  const onChangeHandler = (e) => {
    setUsername(e.currentTarget.value);
  };

  const onClickHandler = () => {
    setGlobalUsername(username);
  };

  return (
    <div className="config-container">
      <h1 className="config-title">
        <FaCog /> Config
      </h1>
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={onChangeHandler}
      />
      <button onClick={onClickHandler}>Save</button>
    </div>
  );
}

export default Config;
