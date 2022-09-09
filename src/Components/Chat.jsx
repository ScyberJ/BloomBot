import "../css/Chat.css";
import ChatBar from "./ChatBar";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

function Chat() {
  return (
    <div className="chat-container">
      <ChatBar />
      <Messages />
      <MessageInput />
    </div>
  );
}

export default Chat;
