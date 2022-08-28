import { useState, useEffect, useRef } from "react";
import { FaArrowRight, FaTrash, FaUser } from "react-icons/fa";
import bloomLogo from "./assets/BloomLogo.png";
import "./App.css";
import BindedInput from "./Components/BindedInput";
import Message from "./Components/Message";

const parameters = {
  max_new_tokens: 40,
  top_p: 0.9,
  do_sample: false,
  seed: 42,
  early_stopping: false,
  length_penalty: 0.0,
  eos_token_id: null,
};

let userMessages = [];

function App() {
  const [message, setMessage] = useState("");
  const [dialogue, setDialogue] = useState([]);
  const [username, setUsername] = useState("");

  const BOT_NAME = "BloomBot";
  const USERNAME = username || "Guest";

  const API_TOKEN = "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";

  const properSentence = new RegExp(/.*:{1}.*[?!.]{1,2}/, "g");

  const messages = useRef(null);

  const sendBtn = useRef(null);

  const formatInputForAPI = () =>
    `${stringifyDialogue(dialogue)}\n${USERNAME}: ${addPunctuationAtEnd(
      message
    )}\n${BOT_NAME}:`;

  const addPunctuationAtEnd = (string) =>
    string + (string.charAt(string.length - 1).match(/[.?!]/) ? "" : ".");

  const stringifyDialogue = (dialogue) =>
    dialogue.map((speechArr) => speechArr.join(":")).join("\n");

  const sanitizeGeneratedText = (generatedText) => {
    if (!generatedText) return;
    let stopInd = { ind: null, stop: false };
    return (
      generatedText
        .split("\n")
        .map((text) => {
          return text.match(properSentence);
        })
        // filters out null values
        .filter((text) => text)
        // flattens the 2d array
        .flat()
        // checks if ai generated any user responses and filters them out
        // .filter(
        //   (text) =>
        //     userMessages.some((q) => text.includes(`${USERNAME}: ${q}`)) ||
        //     text.includes(`${BOT_NAME}:`)
        // )
        .map((text, ind, arr) => {
          if (
            !(
              userMessages.some((msg) =>
                text.includes(`${USERNAME}: ${msg}`)
              ) || text.includes(`${BOT_NAME}:`)
            ) &&
            !stopInd.stop
          ) {
            stopInd = { ind: arr.indexOf(text), stop: true };
            console.log("this is the culprit " + text);
          }
          return text;
        })
        .slice(stopInd.ind ? (0, stopInd.ind) : 0)
        // turns dialogue string format into more friendly array format
        .map((text) => text.split(":"))
    );
  };

  const renderMessages = () => {
    return dialogue.map(([username, message]) => (
      <Message
        key={message.length + username.length * Math.random() * 5}
        username={username}
        alignment={username === USERNAME ? "left" : "right"}
      >
        {message}
      </Message>
    ));
  };

  // keeps chat feed at the latest chat
  useEffect(() => {
    if (messages) {
      const messagesObserver = new MutationObserver(
        (mutationList, observer) => {
          mutationList.forEach((mutation) => {
            if (mutation.type === "childList") {
              mutation.target.scroll({
                top: mutation.target.scrollHeight,
                behavior: "smooth",
              });
            }
          });
        }
      );
      messagesObserver.observe(messages.current, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    }
  }, []);

  async function request(data) {
    setDialogue([...dialogue, [USERNAME, addPunctuationAtEnd(message)]]);
    setMessage("");

    const response = await fetch(
      "https://api-inference.huggingface.co/models/bigscience/bloom",
      {
        headers: { authorization: `Bearer ${API_TOKEN}` },
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    const json = await response.json();
    // destructuring of response
    const [{ generated_text }] = json;

    const sanitizedText = sanitizeGeneratedText(generated_text);
    console.log("this is the original text: " + generated_text);
    console.log("this is the sanitized text: " + sanitizedText);
    setDialogue(sanitizedText);
  }

  const clear = () => {
    setDialogue([]);
    userMessages = [];
  };

  const onClickHandler = async () => {
    userMessages.push(message);
    if (dialogue.length > 40) {
      setDialogue(dialogue.slice(5));
    }
    await request({
      inputs: formatInputForAPI(),
      parameters,
    });
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      sendBtn.current.click();
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo-container">
          <img className="bloom-logo" src={bloomLogo} alt="BLOOM logo" />
          <span className="bot-text">Bot</span>
        </div>
        <div className="username-input-container">
          <label htmlFor="username">
            <FaUser /> Username
          </label>
          <BindedInput
            name={"username"}
            bindedVar={username}
            setVarFunc={setUsername}
          />
        </div>
      </nav>
      <div className="messages" ref={messages}>
        {renderMessages()}
      </div>
      <div className="message-input-container">
        <span className="user-id">{USERNAME}:</span>
        <BindedInput
          name={"message"}
          bindedVar={message}
          setVarFunc={setMessage}
          onKeyDownHandler={onKeyDownHandler}
        />
        <div className="btn-container">
          <button className="btn-send" ref={sendBtn} onClick={onClickHandler}>
            <FaArrowRight />
          </button>
          <button className="btn-clear" onClick={clear}>
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
