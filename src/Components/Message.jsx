import "../css/Message.css";

function Message({ username, children, alignment }) {
  const style = {
    alignItems: alignment === "left" ? "start" : "end",
    "--x-shadow": alignment === "left" ? "-5px" : "5px",
  };
  return (
    <div style={style} className="message">
      <span style={{ textAlign: alignment }} className="username">
        {username}
      </span>
      <p className="message-text">{children}</p>
    </div>
  );
}

export default Message;
