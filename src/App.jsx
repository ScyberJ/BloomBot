import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
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

let userQueries = [];

function App() {
  const [query, setQuery] = useState("");
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
    setDialogue([...dialogue, [userIdentity, addPunctuationAtEnd(query)]]);

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
          userQueries.some((q) => text.includes(`${userIdentity}: ${q}`)) ||
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
    //         userQueries.some((q) => text.includes(`${userIdentity}: ${q}`)) ||
    //         text.includes(`${botName}:`)
    //     )
    // );
    console.log(generated_text);
    console.log(sanitizedText);
    setDialogue(sanitizedText);
  }

  const botName = "AIChatBot";
  const userIdentity = username || "Guest";

  const onClickHandler = async () => {
    userQueries.push(query);
    console.log(addPunctuationAtEnd(query));
    await request({
      inputs:
        dialogue.map((speechArr) => speechArr.join(":")).join("\n") +
        "\n" +
        `${userIdentity}: ${addPunctuationAtEnd(query)}\n${botName}: `,
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
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        placeholder="Enter username here"
      />{" "}
      <br />
      <input
        className="query"
        type="text"
        ref={ref}
        onChange={() => setQuery(ref.current.value)}
      />
      <br />
      <input type="button" value="Submit" onClick={onClickHandler} />
      <br />
      <input
        type="button"
        value="Clear"
        onClick={() => {
          setDialogue([]);
          userQueries = [];
        }}
      />
      <br />
    </div>
  );
}

export default App;
