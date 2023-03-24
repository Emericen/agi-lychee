import React, { useState, useRef, useCallback } from "react";

const textBoxStyle = {
  width: "100%",
  marginLeft: "10px",
  backgroundColor: "black",
  color: "white",
  border: "none",
  outline: "none",
  fontFamily: "monospace",
  fontSize: "calc(16px + 0.2vw)",
  overflow: "hidden",
  resize: "none",
  borderLeft: "1px solid lime",
};

const TextInput = (props) => {
  const [userInput, setUserInput] = useState("");
  const inputRef = useRef(null);


  const autoGrow = (element) => {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  };


  const handleUserInput = (e) => {
    setUserInput(e.target.value);
    autoGrow(e.target);
  };

  const handleKeyPress = useCallback(
    async (e) => {
      if (e.key === "Enter") {
        if (e.shiftKey) {
          autoGrow(inputRef.current);
        } else {
          e.preventDefault();
          props.onEnter(userInput);
        }
      }
    },
    [userInput]
  );

  return (
    <textarea
      ref={inputRef}
      style={textBoxStyle}
      value={userInput}
      placeholder={props.placeholder}
      onChange={handleUserInput}
      onKeyDown={handleKeyPress}
      autoFocus
      rows={1}
    />
  );
};

export default TextInput;