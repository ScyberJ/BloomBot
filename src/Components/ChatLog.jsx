import "../css/ChatLog.css";
import { setChat } from "../Features/chat/chatSlice";
import { FaTrash } from "react-icons/fa";
import { removeChatLog as removeChatLog } from "../Features/chatLog/chatLogSlice";
import { useDispatch, useSelector } from "react-redux";

function ChatLog({ id, title, body }) {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chatLog.chats);
  const chatId = useSelector((state) => state.chat.id);

  const switchToChat = () => {
    chats.forEach((chatlog) => {
      if (chatlog.id === id) dispatch(setChat(chatlog));
    });
  };

  const deleteChatLog = (event) => {
    let chatLogIndex;

    chats.forEach((chatLog, ind) => {
      if (chatLog.id === id) chatLogIndex = ind;
    });

    if (chatId === id) {
      dispatch(setChat(chatLogIndex > 0 ? chats[chatLogIndex - 1] : chats[0]));
    }

    dispatch(removeChatLog(chatLogIndex));

    event.stopPropagation();
  };

  return (
    <div
      className={`chat-log ${chatId === id ? "active-chat" : ""}`}
      onClick={switchToChat}
    >
      <div className="chat-log-info">
        <span className="id">#{id}</span>
        <h1>{title}</h1>
        <span>
          {body
            ? body.slice(1).join("").split(" ").slice(0, 5).join(" ") + "...."
            : "No messages"}
        </span>
      </div>
      <button className="chat-log-btn" onClick={deleteChatLog}>
        <FaTrash />
      </button>
    </div>
  );
}

export default ChatLog;
