import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  const predefinedQA = {
    "What are your services?": "We provide online doctor consultations, appointment bookings, and health checkups.",
    "How can I book an appointment?": "You can click on the 'Book Appointment' section and follow the steps.",
    "What is the consultation fee?": "Our consultation fees vary depending on the doctor, starting from $20.",
    "Who are your top doctors?": "You can find the list of our top doctors in the 'Top Doctors' section.",
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }]);
      const reply = predefinedQA[input.trim()] || "Sorry, I didn't understand that. Please ask something else.";
      setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
      setInput('');
    }
  };

  const handleClose = () => {
    setIsMinimized(true);
    setTimeout(() => setIsVisible(false), 300);
  };

  const toggleChatbot = () => {
    if (isMinimized) {
      setIsVisible(true);
      setIsMinimized(false);
    } else {
      setIsMinimized(true);
      setTimeout(() => setIsVisible(false), 300);
    }
  };

  const handlePredefinedQuestion = (question) => {
    setMessages([...messages, { sender: 'user', text: question }]);
    const reply = predefinedQA[question] || "Sorry, I didn't understand that. Please ask something else.";
    setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
  };

  return (
    <div>
      <div
        className={`chatbot-circle ${isVisible ? 'open' : ''}`}
        onClick={toggleChatbot}
      >
        {isMinimized ? '+' : 'Chat'}
      </div>

      {isVisible && (
        <div className={`chatbot ${isMinimized ? 'minimized' : 'expanded'}`}>
          <div className="chatbot-header">
            <button onClick={handleClose} className="close-btn">X</button>
          </div>
          <div className="chatbot-window">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
            />
            <button onClick={handleSend}>Send</button>
          </div>

          <div className="predefined-questions">
            <button onClick={() => handlePredefinedQuestion('What are your services?')}>What are your services?</button>
            <button onClick={() => handlePredefinedQuestion('How can I book an appointment?')}>How can I book an appointment?</button>
            <button onClick={() => handlePredefinedQuestion('What is the consultation fee?')}>What is the consultation fee?</button>
            <button onClick={() => handlePredefinedQuestion('Who are your top doctors?')}>Who are your top doctors?</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .chatbot-circle {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 50px;
          height: 50px;
          background-color: #007bff;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease-in-out;
        }
        .chatbot-circle.open {
          background-color: #ff4d4d;
        }
        .chatbot {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 300px;
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          background: white;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
          z-index: 999;
          transition: height 0.3s ease-in-out;
        }
        .chatbot.minimized {
          height: 50px;
        }
        .chatbot.expanded {
          height: 400px;
        }
        .chatbot-header {
          display: flex;
          justify-content: flex-end;
          padding: 5px;
        }
        .close-btn {
          background-color: #ff4d4d;
          color: white;
          border: none;
          border-radius: 50%;
          padding: 5px 10px;
          cursor: pointer;
        }
        .chatbot-window {
          padding: 10px;
          background: #f7f7f7;
          height: 250px;
          overflow-y: auto;
        }
        .chat-message {
          margin: 5px 0;
        }
        .chat-message.user {
          text-align: right;
          color: #007bff;
        }
        .chat-message.bot {
          text-align: left;
          color: #333;
        }
        .chatbot-input {
          display: flex;
          padding: 10px;
          background: white;
        }
        .chatbot-input input {
          flex: 1;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .chatbot-input button {
          margin-left: 10px;
          padding: 8px 12px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .predefined-questions {
          display: flex;
          flex-direction: column;
          padding: 10px;
          background-color: #f0f0f0;
          max-height: 150px;
          overflow-y: auto;
        }
        .predefined-questions button {
          background: #f0f0f0;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin: 5px 0;
          cursor: pointer;
        }
        .predefined-questions button:hover {
          background: #007bff;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
