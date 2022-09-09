import { setChat } from "../Features/chat/chatSlice";
import { useDispatch, useSelector } from "react-redux";

function ChatLog({ id, title, body }) {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chatLog.chats);

  const onClickHandler = () => {
    chats.forEach((chatlog) => {
      if (chatlog.id === id) dispatch(setChat(chatlog));
    });
  };

  return (
    <div className="chat-log" onClick={onClickHandler}>
      <h1>{title}</h1>
      <span className="id">{id}</span>
      <span>{body}</span>
    </div>
  );
}

export default ChatLog;
