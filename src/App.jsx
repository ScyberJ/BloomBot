import "./App.css";
import Navbar from "./Components/Navbar";
import ChatLogs from "./Components/ChatLogs";
import ActiveChat from "./Components/Chat";

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
