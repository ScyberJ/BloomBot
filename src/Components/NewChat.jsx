import "../css/NewChat.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBotname, setId, setUsername } from "../Features/chat/chatSlice";
import { addChat } from "../Features/chatLog/chatLogSlice";

function NewChat({ isVisible, setIsVisible }) {
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat);

  const [allowChange, setAllowChange] = useState(false);

  const usernameInput = useRef(null);
  const botnameInput = useRef(null);

  useEffect(() => {
    if (!allowChange) return;
    dispatch(addChat(chat));
    setAllowChange(false);
  }, [chat.id]);

  const onClickHandler = () => {
    const username = usernameInput.current.value;
    const botname = botnameInput.current.value;

    if (username) dispatch(setUsername(username));
    else dispatch(setUsername("Guest"));

    if (botname) dispatch(setBotname(botname));
    else dispatch(setBotname("BloomBot"));

    dispatch(
      setId(
        (username || "Guest") +
          Math.floor(Math.random() * 100) +
          (botname || "BloomBot")
      )
    );

    setAllowChange(true);
    setIsVisible(!isVisible);
    usernameInput.current.value = "";
    botnameInput.current.value = "";
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
