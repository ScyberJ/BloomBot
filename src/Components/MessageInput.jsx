import BindedInput from "./BindedInput";
import React, { useRef, useState, useEffect } from "react";
import { FaArrowRight, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages, setMessages } from "../Features/chat/chatSlice";

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

function MessageInput() {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const { botname, username, messages } = useSelector((state) => state.chat);

  const API_TOKEN = "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";

  const properSentence = new RegExp(/.*:{1}.*[?!.]{1,2}/, "g");

  const sendBtn = useRef(null);

  const formatMessagesForAPIinput = () =>
    `${stringifyMessages(messages)}\n${username}: ${punctuateEndOfSentence(
      message
    )}\n${botname}:`;

  const punctuateEndOfSentence = (string) =>
    string + (string.charAt(string.length - 1).match(/[.?!]/) ? "" : ".");

  const stringifyMessages = (messages) =>
    messages.map((speechArr) => speechArr.join(":")).join("\n");

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
        .map((text, ind, arr) => {
          if (
            !(
              userMessages.some((msg) =>
                text.includes(`${username}: ${msg}`)
              ) || text.includes(`${botname}:`)
            ) &&
            !stopInd.stop
          ) {
            stopInd = { ind: arr.indexOf(text), stop: true };
            console.log("this is the culprit " + text);
          }
          return text;
        })
        .slice(0, stopInd.ind ? stopInd.ind : 100)
        // turns dialogue string format into more friendly array format
        .map((text) => text.split(":"))
    );
  };

  async function request(data) {
    dispatch(
      setMessages([
        ...messages,
        [username, punctuateEndOfSentence(message)],
        [botname, "Loading..."],
      ])
    );
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
    console.log(generated_text);
    console.log(sanitizedText);
    dispatch(setMessages(sanitizedText));
  }

  const onClickHandler = async () => {
    userMessages.push(message);
    if (messages.length > 40) {
      dispatch(setMessages(messages.slice(10)));
    }
    await request({
      inputs: formatMessagesForAPIinput(),
      parameters,
    });
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      sendBtn.current.click();
    }
  };

  return (
    <div className="message-input-container">
      <span className="user-id">{username}:</span>
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
      </div>
    </div>
  );
}

export default MessageInput;
