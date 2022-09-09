import bloomLogo from "../assets/BloomLogo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img className="bloom-logo" src={bloomLogo} alt="BLOOM logo" />
        <span className="bot-text">Bot</span>
      </div>
    </nav>
  );
}

export default Navbar;
