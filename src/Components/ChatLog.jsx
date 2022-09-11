import "../css/ChatLog.css";
import { setChat } from "../Features/chat/chatSlice";
import { FaTrash } from "react-icons/fa";
import { removeChat } from "../Features/chatLog/chatLogSlice";
import { useDispatch, useSelector } from "react-redux";

function ChatLog({ id, title, body }) {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chatLog.chats);

  const switchToChat = () => {
    chats.forEach((chatlog) => {
      if (chatlog.id === id) dispatch(setChat(chatlog));
    });
  };

  const deleteChatLog = () => {
    chats.forEach((chatlog, ind) => {
      if (chatlog.id === id) dispatch(removeChat(ind));
    });
  };

  return (
    <div className="chat-log" onClick={switchToChat}>
      <h1>{title}</h1>
      <span className="id">{id}</span>
      <span>{body}</span>
      <button onClick={deleteChatLog}>
        <FaTrash />
      </button>
    </div>
  );
}

export default ChatLog;
