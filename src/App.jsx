import "./App.css";
import Navbar from "./Components/Navbar";
import ChatLogs from "./Components/ChatLogs";
import ActiveChat from "./Components/Chat";
import { useSelector } from "react-redux";
import NoMessages from "./Components/NoMessages";
import { useState } from "react";

function App() {
  const { chats: chatLogs, isChatLogsVisible } = useSelector(
    (state) => state.chatLog
  );

  return (
    <div className="App">
      <div className={`main ${isChatLogsVisible ? "show" : ""}`}>
        <Navbar />
        <ChatLogs />
      </div>
      {!(chatLogs.length === 0) ? <ActiveChat /> : <NoMessages />}
    </div>
  );
}

export default App;
