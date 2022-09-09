import "../css/ChatBar.css";
import { FaTrash } from "react-icons/fa";
import { clearMessages } from "../Features/chat/chatSlice";
import { useDispatch, useSelector } from "react-redux";

function ChatBar() {
  const dispatch = useDispatch();
  const botname = useSelector((state) => state.chat.botname);

  const clear = () => {
    dispatch(clearMessages());
    // userMessages = [];
  };

  return (
    <div className="chat-bar">
      <h2 className="chat-bar-title">{botname}</h2>
      <button className="btn-clear" onClick={clear}>
        <FaTrash />
      </button>
    </div>
  );
}

export default ChatBar;
