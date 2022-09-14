import "../css/ChatBar.css";
import { clearMessages } from "../Features/chat/chatSlice";
import {
  AiOutlineMenu,
  AiOutlineCloseCircle,
  AiOutlineDelete,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setIsChatLogsVisible } from "../Features/chatLog/chatLogSlice";

function ChatBar({ setUserMessages }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const botname = useSelector((state) => state.chat.botname);

  const clear = () => {
    dispatch(clearMessages());
    setUserMessages([]);
    localStorage.setItem("state", JSON.stringify(state));
  };

  const onClickHandler = () => {
    console.log("clicked");
    dispatch(setIsChatLogsVisible());
  };

  return (
    <div className="chat-bar">
      <button className="chat-logs-visibility-toggle" onClick={onClickHandler}>
        <AiOutlineMenu className="xl" />
      </button>
      <h2 className="chat-bar-title">{botname}</h2>
      <button className="btn-clear" onClick={clear}>
        <AiOutlineDelete className="xl" />
      </button>
    </div>
  );
}

export default ChatBar;
