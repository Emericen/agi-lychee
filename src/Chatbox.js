import React, { useState, useRef, useEffect, useCallback } from "react";
import { getResponse } from "./utils";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Input, Layout, Divider, List, Skeleton } from "antd";
import { SendOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { addMessage, removeMessage } from "./store";

const chatContainerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
};

const chatBoxStyle = {
  overflowY: "auto",
  flexGrow: 1,
  flexBasis: 0,
  padding: "1rem",
  marginBottom: "1rem",
};

const inputSectionStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 1rem",
};

const sendIconStyle = {
  fontSize: "1.5rem",
  cursor: "pointer",
};

const Message = React.memo(({ message, loading }) => {
  const formattedText = message.text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  // Updated styles for sender and message text
  const senderStyle = {
    fontWeight: "bold",
    marginBottom: "4px",
  };

  const messageTextStyle = {
    marginLeft: "1rem",
  };

  if (loading) {
    return (
      <List.Item>
        <Skeleton active />
      </List.Item>
    );
  }

  return (
    <List.Item>
      <div>
        <div style={senderStyle}>{message.sender}:</div>
        <div style={messageTextStyle}>{formattedText}</div>
      </div>
    </List.Item>
  );
});

const ChatBox = () => {
  // Replace the useState for messages with useSelector
  const messages = useSelector((state) => state.messages);

  // Use useDispatch to get a reference to the dispatch function
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textAreaRef = useRef(null); // Add this line

  const handleSendMessage = useCallback(
    async (e) => {
      if (e instanceof KeyboardEvent) {
        if (e.key !== "Enter" || e.shiftKey) return;
        e.preventDefault();
      }

      if (text.trim() !== "") {
        const newMessage = {
          id: messages.length + 1,
          text: text.trim(),
          sender: "USER",
        };

        // Dispatch the ADD_MESSAGE action instead of calling setMessages
        dispatch(addMessage(newMessage));

        // Clear the text area and reset its height
        setText("");

        // Remove focus from the text area and show the placeholder
        textAreaRef.current.resizableTextArea.textArea.blur();
        setTimeout(() => {
          textAreaRef.current.resizableTextArea.textArea.focus();
        }, 0);

        const loadingMessage = {
          id: messages.length + 2,
          text: "",
          sender: "ASSISTANT",
          loading: true,
        };

        // dispatch({ type: "ADD_MESSAGE", payload: loadingMessage });
        dispatch(addMessage(loadingMessage));

        // Call the getResponse method to get the API response
        const response = await getResponse(newMessage.text, messages);

        // Remove the loading message
        dispatch(removeMessage(loadingMessage.id));

        // Call the getResponse method to get the API response
        const responseMessage = {
          id: messages.length + 2,
          text: response,
          sender: "ASSISTANT",
        };

        // Dispatch the ADD_MESSAGE action for the response message
        dispatch(addMessage(responseMessage));
      }
    },
    [text, messages, dispatch]
  );

  useEffect(() => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  }, [messages]);

  return (
    <div style={chatContainerStyle}>
      <div style={chatBoxStyle} ref={messagesEndRef}>
        <List
          dataSource={messages}
          renderItem={(message) => (
            <Message message={message} loading={message.loading} />
          )} // Pass the loading prop
        />
      </div>
      <div style={inputSectionStyle}>
        <TextArea
          autoSize
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onPressEnter={handleSendMessage}
          style={{
            width: "calc(100% - 40px)",
            marginRight: "1rem",
            maxHeight: "100px",
          }} // Add maxHeight property
          ref={textAreaRef} // Add this line
        />
        <SendOutlined onClick={handleSendMessage} style={sendIconStyle} />
      </div>
    </div>
  );
};

export default ChatBox;
