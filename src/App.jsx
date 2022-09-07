import "./App.css";
import Config from "./Components/Config";
import ActiveChat from "./Components/ActiceChat";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <div className="main">
        <Navbar />
        <Config />
      </div>
      <ActiveChat />
    </div>
  );
}

export default App;
