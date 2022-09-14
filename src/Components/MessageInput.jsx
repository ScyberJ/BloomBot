import "../css/MessageInput.css";
import BindedInput from "./BindedInput";
import { setChatLog } from "../Features/chatLog/chatLogSlice";
import { setChat, setMessages } from "../Features/chat/chatSlice";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";

const parameters = {
  max_new_tokens: 40,
  top_p: 0.9,
  do_sample: false,
  seed: 42,
  early_stopping: false,
  length_penalty: 0.0,
  eos_token_id: null,
};

function MessageInput({ userMessages, setUserMessages }) {
  let switchedDuringRequest = false;

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const chat = useSelector((state) => state.chat);
  const { id, botname, username, messages } = chat;
  const [message, setMessage] = useState("");
  const [currentId, setCurrentId] = useState({ id: "", allowChange: false });
  const userMessagesRef = useRef(userMessages);

  const updateUserMessages = (newState) => {
    userMessagesRef.current = newState;
    setUserMessages(newState);
  };

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
              userMessagesRef.current.some((msg) =>
                text.includes(`${username}: ${msg}`)
              ) || text.includes(`${botname}:`)
            ) &&
            !stopInd.stop
          ) {
            stopInd = { ind: arr.indexOf(text), stop: true };
            console.log("this is the culprit" + text);
          }
          return text;
        })
        .slice(0, stopInd.ind ? stopInd.ind : 100)
        // turns dialogue string format into more friendly array format
        .map((text) => text.split(":"))
    );
  };

  const onClickHandler = async () => {
    updateUserMessages([...userMessages, message]);
    if (messages.length > 30) {
      dispatch(setMessages(messages.slice(10)));
    }
    await request({
      inputs: formatMessagesForAPIinput(),
      parameters,
    });
  };

  const onKeyDownHandler = async (event) => {
    if (event.key === "Enter") {
      await onClickHandler();
    }
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

    setCurrentId({ id: chat.id, allowChange: true });

    const json = await response.json();

    // destructuring of response
    const [{ generated_text }] = json;

    const sanitizedText = sanitizeGeneratedText(generated_text);

    dispatch(setChatLog({ ...chat, messages: sanitizedText }));
  }

  useEffect(() => {
    updateUserMessages(messages.filter((msg) => msg.includes(`${username}: `)));
  }, []);

  useEffect(() => {
    if (currentId.id === chat.id && currentId.allowChange) {
      console.log("allowed");
      for (let currentChat of state.chatLog.chats) {
        console.log(currentChat);
        currentChat.id === chat.id ? dispatch(setChat(currentChat)) : "";
      }
      setCurrentId({ ...currentId, allowChange: false });
    }
  }, [state.chatLog.chats]);

  useEffect(() => {
    dispatch(setChatLog(chat));
    localStorage.setItem("state", JSON.stringify(state));
  }, [messages]);

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
          <FaArrowRight className="send-icon" />
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
