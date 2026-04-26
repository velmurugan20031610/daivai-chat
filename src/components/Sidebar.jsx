function Sidebar({ chats, currentChat, setCurrentChat, onNewChat }) {
  return (
    <div className="sidebar">
      <h2>DaivAI</h2>

      <button onClick={onNewChat}>+ New Chat</button>

      <div>
        {chats.map((chat, index) => (
          <div
            key={index}
            onClick={() => setCurrentChat(index)}
            style={{
              padding: "10px",
              cursor: "pointer",
              background: currentChat === index ? "#ddd" : "transparent",
            }}
          >
            Chat {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;