import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import LoadingDots from "./Loading";
import TextInput from "./TextInput";

const terminalStyle = {
  fontFamily: "monospace",
  fontSize: "calc(16px + 0.2vw)",
  overflowY: "auto",
  whiteSpace: "pre-wrap",
  paddingLeft: "20px",
  paddingTop: "20px",
  marginBottom: "20%", // TODO: better margin bottom for mobile considering keyboard
};

const promptStyle = {
  paddingLeft: "10px",
  color: "white",
  fontStyle: "italic",
  // fontWeight: "bold",
};

const responseStyle = {
  paddingLeft: "10px",
  color: "white",
};

const Terminal = (props) => {
  const messages = useSelector((state) => state.messages);

  const messagesEndRef = useRef(null);
  const scrollToBottomRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    scrollToBottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const renderText = (message) => {
    switch (message.role) {
      case "user":
        return (
          <div style={{ display: "flex" }}>
            <div style={{ color: "lime" }}>问:</div>
            <div style={promptStyle}>{message.content}</div>
          </div>
        );
      case "assistant":
        return (
          <div style={{ display: "flex" }}>
            <div style={{ color: "lime" }}>答:</div>
            <div style={responseStyle}>{message.content}</div>
          </div>
        );
      case "helper":
        return <div style={{ color: "cyan" }}>{message.content}</div>;
      case "warning":
        return <div style={{ color: "yellow" }}>{message.content}</div>;
      case "error":
        return <div style={{ color: "red" }}>{message.content}</div>;
      case "loading":
        return (
          <div style={{ display: "flex" }}>
            <div style={{ color: "lime" }}>A:</div>
            <div style={responseStyle}>
              <LoadingDots />
            </div>
          </div>
        );
      case "input":
        return (
          <div style={{ display: "flex" }}>
            <div style={{ color: "lime" }}>问:</div>
            <TextInput onEnter={props.onEnter} placeholder={message.content} />
          </div>
        );
    }
  };

  return (
    <div style={terminalStyle}>
      <div ref={messagesEndRef}>
        {messages.map((message, index) => (
          <div key={index}>
            {renderText(message)}
            <br />
          </div>
        ))}
        <div ref={scrollToBottomRef} />
      </div>
    </div>
  );
};

export default Terminal;
