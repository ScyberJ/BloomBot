import "./App.css";
import Config from "./Components/Config";
import Chat from "./Components/Chat";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main">
        <Config />
        <Chat />
      </div>
    </div>
  );
}

export default App;
