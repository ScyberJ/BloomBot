import { useState, useEffect, useRef } from "react";
import { FaArrowRight, FaTrash } from "react-icons/fa";
import "./App.css";
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

  const addPunctuationAtEnd = (string) =>
    string + (string.charAt(string.length - 1).match(/[.?!]/) ? "" : ".");

  const properSentence = new RegExp(/.*:{1}.*[?!.]{1,2}/, "g");

  const ref = useRef(null);
  const messages = useRef(null);

  useEffect(() => {
    if (messages) {
      messages.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

  const API_TOKEN = "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";

  async function request(data) {
    setDialogue([...dialogue, [userIdentity, addPunctuationAtEnd(message)]]);

    const response = await fetch(
      "https://api-inference.huggingface.co/models/bigscience/bloom",
      {
        headers: { authorization: `Bearer ${API_TOKEN}` },
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    const json = await response.json();
    console.log(json);
    const [{ generated_text }] = json;
    const sanitizedText = generated_text
      .split("\n")
      .map((text, ind) => {
        // if (ind === 0) return text;
        return text.match(properSentence);
      })
      .filter((text) => text)
      .flat()
      .filter(
        (text, ind) =>
          // ind === 0 ||
          userMessages.some((q) => text.includes(`${userIdentity}: ${q}`)) ||
          text.includes(`${botName}:`)
      )
      .map((text) => text.split(":"));
    // console.log(
    //   generated_text
    //     .split("\n")
    //     .map((text) => {
    //       return text.match(properSentence);
    //     })
    //     .filter((text) => text)
    //     .flat()
    //     .filter(
    //       (text) =>
    //         userMessages.some((q) => text.includes(`${userIdentity}: ${q}`)) ||
    //         text.includes(`${botName}:`)
    //     )
    // );
    console.log(generated_text);
    console.log(sanitizedText);
    setDialogue(sanitizedText);
  }

  const botName = "AIChatBot";
  const userIdentity = username || "Guest";

  const clear = () => {
    setDialogue([]);
    userMessages = [];
  };

  const onChangeHandler = (e, setFunc) => setFunc(e.target.value);

  const onClickHandler = async () => {
    userMessages.push(message);
    console.log(addPunctuationAtEnd(message));
    await request({
      inputs:
        dialogue.map((speechArr) => speechArr.join(":")).join("\n") +
        "\n" +
        `${userIdentity}: ${addPunctuationAtEnd(message)}\n${botName}: `,
      parameters,
    });
  };

  return (
    <div className="App">
      <div className="messages" ref={messages}>
        {dialogue.map(([username, message]) => (
          <Message
            username={username}
            alignment={username === userIdentity ? "left" : "right"}
          >
            {message}
          </Message>
        ))}
      </div>
      <input
        className="username"
        type="text"
        onChange={(e) => onChangeHandler(e, setUsername)}
        value={username}
        placeholder="Enter username here"
      />{" "}
      <br />
      <div className="message-input-container">
        <input
          className="message"
          type="text"
          value={message}
          onChange={(e) => onChangeHandler(e, setMessage)}
          placeholder="Enter Message here"
        />
        <div className="btn-container">
          <button onClick={onClickHandler}>
            Send <FaArrowRight />
          </button>
          <button onClick={clear}>
            Clear <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
