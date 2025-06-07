// model/TribalStudent.js
const mongoose = require('mongoose');

const tribalStudentSchema = new mongoose.Schema({
  name: String,
  gender: String,
  fatherName: String,
  motherName: String,
  gotra: String,
  caste: String,
  qualification: String,
  age: String,
  mobile: String,
  bloodGroup: String,
  permanentAddress: String,
  localAddress: String,
  email: String,
  interests: String,
  thoughts: String,
  purpose: String,
  division: String,
  photo: String,
   status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
},
{
  timestamps: true,
});

module.exports = mongoose.model('TribalStudent', tribalStudentSchema);
