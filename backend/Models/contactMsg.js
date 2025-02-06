const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName:{
    type:String,required:true,unique:true
  },
  lastName:{
    type:String,required:true,unique:true
  },
  contact:{
    type:Number,required:true,unique:true
  },
  subject:{
    type:String,required:true
  },
  message:{
    type:String,required:true,
  },
});
const ContactModel = mongoose.model("messages", UserSchema);
module.exports = ContactModel;