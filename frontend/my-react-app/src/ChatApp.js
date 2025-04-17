import React, { useState } from 'react';
import axios from 'axios';
import './ChatApp.css';

function ChatApp() {
  const [messages, setMessages] = useState([
    {
      type: 'received',
      sender: 'AI Chatbot',
      content: 'Hi, I am your AI Chatbot, you can ask me anything.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [
      ...messages,
      { type: 'sent', sender: 'You', content: input },
    ];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      console.log("test1")
      const response = await axios.post('http://localhost:8000/api/chat/', {
        question: input,
      });
      const botReply = response.data.answer;

      setMessages([
        ...newMessages,
        {
          type: 'received',
          sender: 'AI Chatbot',
          content: botReply,
        },
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          type: 'received',
          sender: 'AI Chatbot',
          content: 'Sorry, something went wrong. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="card flex-grow-1">
        <div className="card-header bg-primary text-white">Chat</div>
        <div className="card-body messages-box">
          <ul className="list-unstyled messages-list">
            {messages.map((msg, idx) => (
              <li key={idx} className={`message ${msg.type}`}>
                <div className="message-text">
                  <div className="message-sender">
                    <b>{msg.sender}</b>
                  </div>
                  <div className="message-content">{msg.content}</div>
                </div>
              </li>
            ))}
            {loading && (
              <li className="message received">
                <div className="message-text">
                  <div className="message-sender">
                    <b>AI Chatbot</b>
                  </div>
                  <div className="message-content">Typing...</div>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      <form className="message-form" onSubmit={handleSend}>
        <div className="input-group">
          <input
            type="text"
            className="form-control message-input"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary btn-send">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatApp;
