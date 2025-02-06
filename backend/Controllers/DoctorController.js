const Doctor = require("../Models/Doctors.js")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const doctorcon= async(req,res)=>{
  try{
    const {name,specialization,hospital}= req.body;
    const doctor = await Doctor.findOne({name});
    if(doctor){
      return res.status(409).json({message:"Doctor already exists",success:false});
    }

    const docmodel = new Doctor({name,specialization,hospital});
    await docmodel.save();res.status(201).json({message:"Success doctor",success:true});
  }catch(e){
    res.status(500).json({
      message:"Internal Server Error"+e ,success:false
    })
  }
}

module.exports = {
  doctorcon
}