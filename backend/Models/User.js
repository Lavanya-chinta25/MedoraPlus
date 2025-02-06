const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName:{
    type:String,required:true,
  },contact:{
    type:Number,required:true,unique:true
  },
  locality:{
    type:String,required:true,unique:true
  },
  district:{
    type:String,required:true,unique:true
  },
  gender:{
    type:String,required:true,unique:true
  },
  state:{
    type:String,required:true,unique:true
  },
  pincode:{
    type:Number,required:true,unique:true
  },
  
  password:{
    type:String,required:true,
  },
});
const UserModel = mongoose.model("logindetails", UserSchema);
module.exports = UserModel;