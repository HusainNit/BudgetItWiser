import { useState } from "react";
import CircleProgress from "../ui/CircleProgress";

function AiChat() {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true); // Show loader before sending

    try {
      const result = await window.puter.ai.chat(input);

      setChatHistory((prev) => [
        ...prev,
        {
          role: "user",
          content: input,
        },
        result.message,
      ]);
    } finally {
      setLoading(false); // Hide loader after response
      setInput("");
    }
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

      {loading && <CircleProgress loading={loading} />}
    </div>
  );
}

export default AiChat;
