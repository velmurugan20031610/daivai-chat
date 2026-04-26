function Message({ msg, onDelete, onEdit, onReply }) {
  const isUser = msg.sender === "user";

  return (
    <div className={`message ${msg.sender}`}>
      {msg.replyTo && (
        <div className="reply-preview">{msg.replyTo}</div>
      )}

      <div className="bubble">
        <div>{msg.text}</div>

        <div className="bottom-row">
          <div className="actions">
            <button onClick={() => onReply(msg.text)}>Reply</button>
            {isUser && (
              <>
                <button onClick={onEdit}>Edit</button>
                <button onClick={onDelete}>Delete</button>
              </>
            )}
          </div>

          {isUser && (
            <span className="seen">
              {msg.seen ? "✔✔" : "✔"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;