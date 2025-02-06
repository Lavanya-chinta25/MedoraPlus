const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const doctorSchema = new mongoose.Schema({
  id: Number,
  name: String,
  specialization: String,
  address: String,
  pincode: String,
  contact: String,
  rating: Number,
  reviews: Number,
  fee: Number,
  hospital: String,
  experience: Number,
});

const Doctor = mongoose.model("doctor", doctorSchema);
module.exports = Doctor;