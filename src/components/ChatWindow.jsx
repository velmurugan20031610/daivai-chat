import { useState } from "react";
import Message from "./Message";
import InputBox from "./InputBox";
import { toast } from "react-toastify";

function ChatWindow({ chats, currentChat, setChats }) {
  const [editingMsg, setEditingMsg] = useState(null);
  const [editText, setEditText] = useState("");
  const [replyText, setReplyText] = useState(null);

  const currentMessages = chats[currentChat];

  const handleReply = (text) => {
    setReplyText(text);
  };

  const handleSend = (msg) => {
    if (!msg.trim()) return;

    const updatedChats = [...chats];

    updatedChats[currentChat] = [
      ...updatedChats[currentChat],
      {
        text: msg,
        sender: "user",
        replyTo: replyText,
        seen: true
      },
      {
        text: "AI response for: " + msg,
        sender: "ai"
      }
    ];

    setChats(updatedChats);
    setReplyText(null);
  };

  const deleteMessage = (index) => {
    const updatedChats = [...chats];
    updatedChats[currentChat] = updatedChats[currentChat].filter(
      (_, i) => i !== index
    );

    setChats(updatedChats);
    toast.success("Message deleted");
  };

  const openEdit = (msg, index) => {
    setEditingMsg({ ...msg, index });
    setEditText(msg.text);
  };

  const saveEdit = () => {
    const updatedChats = [...chats];
    updatedChats[currentChat][editingMsg.index].text = editText;

    setChats(updatedChats);
    setEditingMsg(null);
    toast.success("Message updated");
  };

  return (
    <div className="chat-container">
      <div className="chat">

        {currentMessages.length === 0 ? (
          <div className="empty">
            <h1>DaivAI</h1>
            <p>Ask me anything. I'm here to help.</p>
          </div>
        ) : (
          <div className="messages">
            {currentMessages.map((msg, i) => (
              <Message
                key={i}
                msg={msg}
                onDelete={() => deleteMessage(i)}
                onEdit={() => openEdit(msg, i)}
                onReply={handleReply}
              />
            ))}
          </div>
        )}

        {replyText && (
          <div style={{ padding: "6px", background: "#eee" }}>
            Replying to: {replyText}
          </div>
        )}

        <InputBox sendMessage={handleSend} />
      </div>

     
      {editingMsg && (
        <div className="modal">
          <div className="modal-box">
            <h3>Edit Message</h3>

            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />

            <div className="modal-buttons">
              <button onClick={() => setEditingMsg(null)}>Cancel</button>
              <button onClick={saveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatWindow;