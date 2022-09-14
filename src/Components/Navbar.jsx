import "../css/Navbar.css";
import bloomLogo from "../assets/BloomLogo.png";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setIsChatLogsVisible } from "../Features/chatLog/chatLogSlice";

function Navbar() {
  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(setIsChatLogsVisible(false));
  };

  return (
    <nav className="navbar">
      <button className="chat-logs-visibility-toggle" onClick={onClickHandler}>
        <AiOutlineClose className="close-icon xl" />
      </button>
      <div className="logo-container">
        <img className="bloom-logo" src={bloomLogo} alt="BLOOM logo" />
        <span className="bot-text">Bot</span>
      </div>
    </nav>
  );
}

export default Navbar;
