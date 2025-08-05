import { useState } from "react";

function AiChat() {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const result = await window.puter.ai.chat(input);

    setChatHistory((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
      result.message,
    ]);

    setInput("");
  };

  return (
    <div>
      <h3>Ask Budget Assistant</h3>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. How can I save more this month?"
      />
      <button onClick={sendMessage} className="aiButton">
        Send
      </button>

      <div className="conatainerofAi">
        {chatHistory.map((msg, i) => (
          <div className="respon" key={i}>
            <p key={i}>
              <strong>{msg.role}:</strong> {msg.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AiChat;
