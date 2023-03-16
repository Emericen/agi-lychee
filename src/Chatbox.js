import React, { useState, useRef, useEffect, useCallback } from "react";
import { getResponse } from "./utils";
import { Avatar, Input, Layout, Divider, List, Skeleton } from "antd";
import { SendOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const chatContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
};

const chatBoxStyle = {
  overflowY: 'auto',
  flexGrow: 1,
  flexBasis: 0,
  padding: '1rem',
  marginBottom: '1rem',
};

const inputSectionStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 1rem',
};

const sendIconStyle = {
  fontSize: '1.5rem',
  cursor: 'pointer',
};

const Message = ({ message }) => (
  <List.Item style={ { marginBottom: 16 }}>
    <div style={ { fontWeight: "bold" }}>{message.sender}</div>
    {message.text}
  </List.Item>
);

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textAreaRef = useRef(null); // Add this line


  const scrollToBottomRef = useRef(null);

  const handleSendMessage = useCallback(
    async (e) => {
      if (e instanceof KeyboardEvent) {
        if (e.key !== 'Enter' || e.shiftKey) return;
        e.preventDefault();
      }
  
      if (text.trim() !== '') {
        const newMessage = {
          id: messages.length + 1,
          text: text.trim(),
          sender: 'USER',
        };
        setMessages([...messages, newMessage]);
        setText('');
        textAreaRef.current.resizableTextArea.textArea.style.height = 'auto'; // Add this line
      }
    },
    [text, messages]
  );

  useEffect(() => {
    const fetchResponse = async () => {
      setLoading(true);
      try {
        const response = await getResponse(text.trim());
        const responseMessage = {
          id: messages.length + 1,
          text: response,
          sender: "BOT",
        };
        setMessages([...messages, responseMessage]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (messages.length > 0 && messages[messages.length - 1].sender === "USER") {
      fetchResponse();
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  }, [messages]);

  return (
    <div style={chatContainerStyle}>
      <div style={chatBoxStyle} ref={messagesEndRef}>
        <List dataSource={messages} renderItem={(message) => <Message message={message} />} />
        {loading && <Skeleton active />}
      </div>
      <div style={inputSectionStyle}>
        <TextArea
          autoSize
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onPressEnter={handleSendMessage}
          style={ { width: 'calc(100% - 40px)', marginRight: '1rem', maxHeight: '100px' }} // Add maxHeight property
          ref={textAreaRef} // Add this line
        />
        <SendOutlined onClick={handleSendMessage} style={sendIconStyle} />
      </div>
    </div>
  );
};

export default ChatBox;