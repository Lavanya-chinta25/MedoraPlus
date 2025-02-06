import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [chatphnno, setchatphnno] = useState('');
  const [chatId, setChatId] = useState(null);

  const handlePhoneSubmit = async () => {
    if (chatphnno.trim() !== '') {
      try {
              const url = `http://localhost:8080/sendchat`;
              const response = await fetch(url, {
                  method: "POST",
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({"message": messages , "phoneNumber" : chatphnno})
              });
              const result = await response.json();
              console.log(result)
              setChatId(result.chatId);

          } catch (err) {
              console.log(err) 
          }
    }
  };
  
  const handleSend = async () => {
    if (userInput.trim() !== '') {
      // Create the user message in the required format
      const newUserMessage = { text: userInput, sender: 'user' };
  
      // Update the local messages array with the new user message
      setMessages((prev) => [...prev, newUserMessage]);
  
      // Clear the input field after sending the message
      setUserInput('');
  
      // Handle the backend API for Flask (process_input)
      let botMessage = null; // Initialize botMessage variable
      try {
        const response = await fetch('http://127.0.0.1:5000/process_input', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'userInput=' + encodeURIComponent(userInput),
        });
  
        if (response.ok) {
          const data = await response.json();
          botMessage = { text: data.response, sender: 'bot' }; // Assign data.response to botMessage
        } else {
          throw new Error('Failed to fetch from Flask API');
        }
      } catch (error) {
        console.error('Error from Flask API:', error);
      }
  
      // Ensure that botMessage is defined before updating the state
      
  
      // Handle the backend API for Node.js (sendChat)
      if (chatId && chatphnno && botMessage) {
        try {
          const url = `http://localhost:8080/sendChat/${chatphnno}`;
          const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              phoneNumber: chatphnno,
              message: [newUserMessage, botMessage], // Send both user and bot messages
              chatId: chatId,
            }),
          });
          const result = await response.json();
  
          // Update the messages with the bot's response from the backend
          setMessages((prev) => [
            ...prev,
            { text: result.response, sender: 'bot' },
          ]);
        } catch (error) {
          console.error('Error from Node.js API:', error);
        }
      }
    }
  };
  
  

  const getChats = async () => {
    try {
      // Send GET request to the backend to fetch all chats
      const response = await fetch('http://localhost:8080/getChats');
      
      // Check if the response is OK (status code 200)
      if (!response.ok) {
        throw new Error('Failed to fetch chats');
      }
  
      // Parse the response as JSON
      const data = await response.json();
      
      // Log the data to the console
      console.log('Chats data:', data);
  
    } catch (error) {
      // Catch any errors and log them
      console.error('Error fetching chats:', error);
    }
  };
  //getChats();

  const getChatById = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/getChat/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch chat');
      }
  
      const data = await response.json();
      
      console.log('Chat data:', data);
  
    } catch (error) {
      // Catch any errors and log them
      console.error('Error fetching chat:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chatbot-container bg-gray-50 font-inter" style={{ marginTop: '50px' }}>
      <div className="mt-2 p-1 w-full flex items-start">
        <input
          type="number"
          placeholder="Enter your phone no."
          className="p-3 justify-center w-full border-4"
          id="inputField"
          onChange={(e) => setchatphnno(e.target.value)}
        />
        <button onClick={handlePhoneSubmit} className="p-3 justify-center border-4">Submit</button>
      </div>
      
      <div className="chat-window">
        <h3 className="font-bold text-xl text-black text-center">Chat Assistant</h3>

        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.sender === 'user' ? 'user' : 'bot'}`}>
            {msg.text}
          </div>
        ))}
      </div>

      {chatId && (
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
      )}
    </div>
  );
};

export default Chatbot;
