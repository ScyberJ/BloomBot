import "./App.css";
import ActiveChat from "./Components/Chat";
import ChatLogs from "./Components/ChatLogs";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <div className="main">
        <Navbar />
        <ChatLogs />
      </div>
      <ActiveChat />
    </div>
  );
}

export default App;
