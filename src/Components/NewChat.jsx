import "../css/NewChat.css";
import { nanoid } from "nanoid";
import { setChat } from "../Features/chat/chatSlice";
import { addChatLog } from "../Features/chatLog/chatLogSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

function NewChat({ isVisible, setIsVisible }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { chat, ...rest } = state;

  const [allowChange, setAllowChange] = useState(false);

  const usernameInput = useRef(null);
  const botnameInput = useRef(null);

  useEffect(() => {
    if (!allowChange) return;
    dispatch(addChatLog(chat));
    setAllowChange(false);
  }, [chat.id]);

  const onClickHandler = () => {
    const username = usernameInput.current.value;
    const botname = botnameInput.current.value;

    const id = nanoid(15);

    const newChat = {
      id,
      username: username || "Guest",
      botname: botname || "BloomBot",
      messages: [],
    };

    dispatch(setChat(newChat));

    localStorage.setItem("state", JSON.stringify(state));

    setAllowChange(true);

    setIsVisible ? setIsVisible(!isVisible) : null;

    usernameInput.current.value = "";
    botnameInput.current.value = "";
  };

  return (
    <div
      className={
        setIsVisible
          ? `new-chat-container ${isVisible ? "" : "hide"}`
          : "new-chat-container no-chat"
      }
    >
      <h2 className="new-chat-title">Create Chat</h2>
      <div className="new-chat-inputs">
        <input type="text" ref={usernameInput} placeholder="Enter Username" />
        <input type="text" ref={botnameInput} placeholder="Enter Botname" />
      </div>
      <button onClick={onClickHandler}>Create</button>
    </div>
  );
}

export default NewChat;
