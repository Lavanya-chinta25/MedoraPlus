const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  chatId: { type: String, required: true },
  messages: { 
    type: Array, // Allow an empty array
    default: []  // Default to an empty array if not provided
  }
});

const ChatModel = mongoose.model("Chat", ChatSchema);
module.exports = ChatModel;
