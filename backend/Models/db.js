const mongoose = require("mongoose");

const mongo_url = `mongodb+srv://TarunPotnuru:tarun123@resumeapp.yrpea.mongodb.net/logindetails?retryWrites=true&w=majority&appName=ResumeApp`;
mongoose.connect(mongo_url).then(
  ()=>{
    console.log("Mango db connected")
  }
).catch((err)=>{
  console.log(err);
})