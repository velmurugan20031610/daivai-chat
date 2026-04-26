import { useState } from "react";

function InputBox({ sendMessage }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text);
    setText("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="input-box">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Message DaivAI..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default InputBox;