import "../css/ChatBar.css";
import { clearMessages } from "../Features/chat/chatSlice";
import { FaArrowCircleLeft, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setIsChatLogsVisible } from "../Features/chatLog/chatLogSlice";

function ChatBar() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const botname = useSelector((state) => state.chat.botname);

  const clear = () => {
    dispatch(clearMessages());
    localStorage.setItem("state", JSON.stringify(state));
    // userMessages = [];
  };

  const onClickHandler = () => {
    console.log("clicked");
    dispatch(setIsChatLogsVisible());
  };

  return (
    <div className="chat-bar">
      <button className="chat-logs-visibility-toggle" onClick={onClickHandler}>
        <FaArrowCircleLeft />
      </button>
      <h2 className="chat-bar-title">{botname}</h2>
      <button className="btn-clear" onClick={clear}>
        <FaTrash />
      </button>
    </div>
  );
}

export default ChatBar;
