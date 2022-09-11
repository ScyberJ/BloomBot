import "../css/ChatLog.css";
import { setChat } from "../Features/chat/chatSlice";
import { FaTrash } from "react-icons/fa";
import { removeChatLog as removeChatLog } from "../Features/chatLog/chatLogSlice";
import { useDispatch, useSelector } from "react-redux";

function ChatLog({ id, title, body }) {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chatLog.chats);
  const chatID = useSelector((state) => state.chat.id);

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

    if (chatID === id) {
      dispatch(setChat(chatLogIndex > 0 ? chats[chatLogIndex - 1] : chats[0]));
    }

    dispatch(removeChatLog(chatLogIndex));

    event.stopPropagation();
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
