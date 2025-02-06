import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleSend = () => {
    if (userInput.trim() !== '') {
      setMessages([...messages, { text: userInput, sender: 'user' }]);
      // setMessages((prev) => [
      //   ...prev,
      //   { text: 'Thinking...', sender: 'bot' }, // Placeholder for bot response
      // ]);
      // setUserInput('');

      // Simulate a bot response (replace this with your chatbot model logic)
      
      setUserInput('');
      fetch('http://127.0.0.1:5000/process_input', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: 'userInput=' + encodeURIComponent(userInput)
        })
        .then(response => response.json())
        .then(data => {
          setMessages((prev) =>[
            ...prev,
        { text: data.response, sender: 'bot' }
          ]
        )
       

    })
    .catch(error => console.error('Error:', error));
    {console.log("error")}
  
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chatbot-container bg-gray-50 font-inter  "  style={{ marginTop: "50px" }}>
      <div className="chat-window">
      <h3 className="font-bold text-xl text-black text-center">Chat Assistant</h3>

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.sender === 'user' ? 'user' : 'bot'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
