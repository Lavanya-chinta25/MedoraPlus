const express = require("express");
const app = express();
require('dotenv').config();
require('./Models/db.js');  // Assuming you are using some DB connection setup
const bodyParser = require("body-parser");
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const ChatModel = require('./models/sendChat');
 
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  }));

// POST method to handle phone number and initial empty message submission
app.post('/sendChat', async (req, res) => {
    const { phoneNumber, message } = req.body;

    if (!phoneNumber) {
        return res.status(400).json({ error: 'Phone number is required' });
    }

    try {
        let chat = await ChatModel.findOne({ phoneNumber });

        if (!chat) {
            const chatId = Date.now().toString(); // Ensure string format for MongoDB
            chat = new ChatModel({
                phoneNumber,
                chatId,
                messages: message.length > 0 ? [{ sender: 'user', text: message }] : [] // Avoid saving undefined message
            });

            await chat.save();
        } else if (message.length > 0) { 
            chat.messages.push({ sender: 'user', text: message });
            await chat.save();
        }

        res.json({ chatId: chat.chatId, message: 'Chat saved successfully' });
    } catch (err) {
        console.error('Database Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// PUT method to handle new messages and chatbot responses
app.put('/sendChat/:id', async (req, res) => {
    const { phoneNumber, message } = req.body;
    const { id } = req.params; // Getting chatId from URL parameters
    
    if (!phoneNumber || !message || !id) {
      return res.status(400).json({ error: 'Phone number, message, and chatId are required' });
    }
  
    try {
      // Find the chat by phone number (or chatId if that's the unique identifier)
      const chat = await ChatModel.findOne({ phoneNumber: id });
  
      if (!chat) {
        return res.status(400).json({ error: 'Chat not found' });
      }
  
      // Append each message in the array to the messages array
      message.forEach((msg) => {
        chat.messages.push(msg);  // Push both user and bot messages
      });
  
      await chat.save(); // Update the MongoDB document
  
      // Return the last bot's response as a response
      const lastBotResponse = message.find((msg) => msg.sender === 'bot');
      res.json({ response: lastBotResponse.text });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.get('/getChat/:id', async (req, res) => {
    const { id } = req.params; // The phone number as the chat ID
  
    try {
      // Find the chat by phone number
      const chat = await ChatModel.findOne({ phoneNumber: id });
  
      if (!chat) {
        return res.status(404).json({ error: 'Chat not found' });
      }
  
      res.json(chat); // Return the chat object
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/getChats', async (req, res) => {
  try {
    // Retrieve all chats, returning only the phone numbers
    const chats = await ChatModel.find({}, 'phoneNumber'); // Only return phoneNumber field
    
    if (!chats.length) {
      return res.status(404).json({ error: 'No chats found' });
    }

    res.json(chats); // Return the list of all chats (phone numbers)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
