const UserModel = require("../Models/User.js")
const ContactModel = require("../Models/contactMsg.js")
const bcrypt = require('bcrypt');
const { response } = require("express");
const jwt = require("jsonwebtoken");



const getUserDetails = async (req, res) => {
  

try {

  
  const userEmail = req.user.email; 
  console.log(req.body);
  const user = await UserModel.findOne({ email: userEmail });
  
  if (!user) {
      return res.status(404).json({ message: "User not found." });
  }
  const { password, ...userDetails } = user.toObject(); // Exclude password
  res.status(200).json({ message: "User details fetched successfully.", userDetails });
} catch (error) {
  res.status(500).json({ message: "Internal server error.", error: error.message });
}
};
const getmessages = async (req, res) => {
  

try {
  if (!user) {
      return res.status(404).json({ message: "User not found." });
  }
  const { password, ...userDetails } = user.toObject(); // Exclude password
  res.status(200).json({ message: "User details fetched successfully.", userDetails });
} catch (error) {
  res.status(500).json({ message: "Internal server error.", error: error.message });
}
};


// AuthController.js
// const updateUserDetails = async (req, res) => {
//   try {
//     const { fullName, email, contact, locality } = req.body; // assuming these fields are to be updated
//     const userEmail = req.user.email;

//     const user = await UserModel.findOne({ email: userEmail });

//     if (!user) {
//       return res.status(404).json({ message: "User not found", success: false });
//     }

//     // Update user details
//     user.fullName = fullName || user.fullName;
//     user.contact = contact || user.contact;
//     user.locality = locality || user.locality;

//     await user.save();

//     res.status(200).json({ message: "User details updated successfully", success: true });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error", success: false, error });
//   }
// };


const signup = async (req,res)=>{
  try{
    const {fullName,contact,locality,district,gender,state,pincode,password}= req.body;
    const user = await UserModel.findOne({contact});
    if(user){
      return res.status(409).json({message:"User already exists",success:false});
    }

    const userModel = new UserModel({fullName,contact,locality,district,gender,state,pincode,password});
    userModel.password =await bcrypt.hash(password,10);
    await userModel.save();res.status(201).json({message:"Success signup",success:true});
  }catch(e){
    res.status(500).json({
      message:"Internal Server Error"+e ,success:false
    })
  }
}
const login = async (req,res)=>{
  try{
    const {contact,password}= req.body;
    const user = await UserModel.findOne({contact});
    if(!user){
      return res.status(403).json({message:"Authentication failed",success:false});
    }
    const isPasseq = await bcrypt.compare(password, user.password);
    if(!isPasseq){
      return res.status(403).json({message:"Auth failed",success:false});
    }

    const jwttoken = jwt.sign({contact:user.contact,_id : user._id},process.env.JWT_SECRET,{expiresIn:"72h"})
    res.status(200).json({message:"Success login",success:true,jwttoken,contact,name:user.name});
  }catch(e){
    res.status(500).json({
      message:"Internal Server Error",success:false
    })
  }
}

const sendmsg = async (req,res)=>{
  try{
    console.log(req.body)
    const {firstName,lastName,contact,subject, message}= req.body;
    const contactModel = new ContactModel({firstName,lastName,contact,subject, message});
    await contactModel.save();res.status(201).json({message:"Success sent msg",success:true});
  }catch(e){
    res.status(500).json({
      message:"Internal Server Error +2"+e ,success:false
    })
  }
}
module.exports = {
  signup,login,getUserDetails,sendmsg
}