// import React, { useState, useRef, useEffect } from "react";
// import { getResponse } from "./utils";
// import { Avatar, Input, Layout, Divider, List, Skeleton } from "antd";
// import { SendOutlined } from "@ant-design/icons";
// import TextArea from "antd/es/input/TextArea";


// const ChatBox = () => {
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const handleSendMessage = async (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       if (text.trim() !== "") {
//         setMessages([
//           ...messages,
//           { id: messages.length + 1, text: text.trim(), sender: "USER" },
//         ]);
//       }
//       setText("");
//     }
//   };

//   useEffect(() => {
//     messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
//   }, [messages]);

//   return (
//     <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
//       <div style={{ flex: 1, overflow: "auto" }} ref={messagesEndRef}>
//         <List
//           dataSource={messages}
//           renderItem={(message) => (
//             <List.Item style={{ textAlign: "left" }}>
//               <div style={{ fontWeight: "bold" }}>{message.sender}</div>
//               {message.text}
//             </List.Item>
//           )}
//         />
//         {loading && <Skeleton active />}
//       </div>
//       <div
//         style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}
//       >
//         <TextArea
//           autoSize={{ minRows: 1, maxRows: 4 }}
//           placeholder="Type a message"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           onPressEnter={handleSendMessage}
//           style={{ flex: 1 }}
//         />
//         <SendOutlined
//           onClick={handleSendMessage}
//           style={{ fontSize: 24, marginLeft: 8 }}
//         />
//       </div>
//     </div>
//   );
// };

// export default ChatBox;


import React, { useState, useRef, useEffect } from "react";
import { getResponse } from "./utils";
import { Avatar, Input, Layout, Divider, List, Skeleton } from "antd";
import { SendOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSendMessage = async (e) => {
    console.log(e);
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (text.trim() !== "") {
        setMessages([
          ...messages,
          { id: messages.length + 1, text: text.trim(), sender: "USER" },
        ]);
        setLoading(true);
        try {
          const text_copy = text;
          setText("");
          const response = await getResponse(text_copy.trim());
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            const lastUserMessageIndex = updatedMessages
              .slice()
              .reverse()
              .findIndex((message) => message.sender === "USER");
            if (lastUserMessageIndex !== -1) {
              const lastUserMessage = updatedMessages[updatedMessages.length - 1 - lastUserMessageIndex];
              const responseMessage = { id: updatedMessages.length + 1, text: response, sender: "BOT" };
              updatedMessages.splice(updatedMessages.indexOf(lastUserMessage) + 1, 0, responseMessage);
              return updatedMessages;
            } else {
              const responseMessage = { id: updatedMessages.length + 1, text: response, sender: "BOT" };
              return [...updatedMessages, responseMessage];
            }
          });
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  }, [messages]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, overflow: "auto" }} ref={messagesEndRef}>
        <List
          dataSource={messages}
          renderItem={(message) => (
            <List.Item style={{ textAlign: "left" }}>
              <div style={{ fontWeight: "bold" }}>{message.sender}</div>
              {message.text}
            </List.Item>
          )}
        />
        {loading && <Skeleton active />}
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}
      >
        <TextArea
          autoSize={{ minRows: 1, maxRows: 4 }}
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onPressEnter={handleSendMessage}
          style={{ flex: 1 }}
        />
        <SendOutlined
          onClick={handleSendMessage}
          style={{ fontSize: 24, marginLeft: 8 }}
        />
      </div>
    </div>
  );
};

export default ChatBox;
