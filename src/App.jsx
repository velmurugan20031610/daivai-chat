import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [chats, setChats] = useState([[]]);
  const [currentChat, setCurrentChat] = useState(0);

  const handleNewChat = () => {
    setChats([...chats, []]);
    setCurrentChat(chats.length);
  };

  const sendMessage = (msg, replyTo = null) => {
    if (!msg.trim()) return;

    const updatedChats = [...chats];

    updatedChats[currentChat] = [
      ...updatedChats[currentChat],
      {
        text: msg,
        sender: "user",
        replyTo,
        seen: true
      },
      {
        text: "AI response for: " + msg,
        sender: "ai"
      }
    ];

    setChats(updatedChats);
  };

  return (
    <div className="app">
      <ToastContainer position="bottom-right" />

      <Sidebar
        chats={chats}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        onNewChat={handleNewChat}
      />

      <ChatWindow
        chats={chats}
        currentChat={currentChat}
        setChats={setChats}
        sendMessage={sendMessage}
      />
    </div>
  );
}

export default App;