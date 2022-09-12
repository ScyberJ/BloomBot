import "./App.css";
import Navbar from "./Components/Navbar";
import ChatLogs from "./Components/ChatLogs";
import ActiveChat from "./Components/Chat";
import { useSelector } from "react-redux";
import NoMessages from "./Components/NoMessages";

function App() {
  const chatLogs = useSelector((state) => state.chatLog.chats);
  console.log(chatLogs);
  return (
    <div className="App">
      <div className="main">
        <Navbar />
        <ChatLogs />
      </div>
      {!(chatLogs.length === 0) ? <ActiveChat /> : <NoMessages />}
    </div>
  );
}

export default App;
