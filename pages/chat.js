// components/Chat.js
import { Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const marvelCharacters = ["thor", "ironman", "hulk", "spiderman"];

const headingStyle = {
  color: "#9c9c9c",
  fontSize: "2em",
  marginBottom: "10px",
};

const listItemStyle = {
  listStyle: "none",
  fontSize: "1.2em",
  padding: "8px",
  margin: "4px 0",
  background: "#3b3b3b",
  borderRadius: "4px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "background 0.3s ease",
  cursor: "pointer",
};

// Helper function to get a cookie by name
function getCookie(name) {
  if (typeof document === "undefined") {
    return null; // Running on the server, document is not defined
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

// Helper function to generate a random Marvel character
function generateRandomMarvelCharacter() {
  if (marvelCharacters.length === 0) {
    return "Anonymous";
  }

  const randomIndex = Math.floor(Math.random() * marvelCharacters.length);
  const selectedCharacter = marvelCharacters.splice(randomIndex, 1)[0];
  return selectedCharacter;
}

export default function Chat() {
  const messagesRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    getCookie("username") || generateRandomMarvelCharacter()
  );

  useEffect(() => {
    // const newSocket = io("http://localhost:3000/api/chat", {
    //   withCredentials: true,
    // });
    const newSocket = io("https://shylesh.onrender.com/api/chat", {
      withCredentials: true,
    });
    setSocket(newSocket);

    newSocket.on("update users", (users) => {
      // Update the state with the received active users
      setActiveUsers(users);
    });

    newSocket.on("chat message", (data) => {
      const { userId, msg, timestamp } = data;
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          userId,
          msg,
          timestamp,
        },
      ]);
    });

    // Clean up the socket connection on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value.trim();
    if (message.length > 0) {
      socket.emit("chat message", {
        msg: message,
        userId: currentUser,
      });
      e.target.elements.message.value = "";
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <div id="app-bar">
        <h1 className="pain">
          Pain <span className="hub">Hub</span>
        </h1>
      </div>
      <div id="main-content">
        <div id="side-app">
          <h2 style={headingStyle}>Active Users</h2>
          <ul>
            {activeUsers.map((user, index) => (
              <li key={index} style={listItemStyle}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: "#2ecc71",
                    }}
                  ></div>
                  <Typography>{user}</Typography>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div id="chat-section">
          <ul id="messages" ref={messagesRef}>
            {messages.map((message, index) => (
              <li
                key={index}
                className={
                  message.userId === currentUser
                    ? "currentUserMessage"
                    : "otherUserMessage"
                }
              >
                <div className="message-container">
                  <div className="message-wrapper">
                    <span className="username">{message.userId}</span>
                    <span className="timeStamp">
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                  <div className="message-bubble">{message.msg}</div>
                </div>
              </li>
            ))}
          </ul>
          <form id="form" onSubmit={handleSubmit}>
            <input
              id="m"
              autoComplete="off"
              placeholder="Type your message..."
              name="message"
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
