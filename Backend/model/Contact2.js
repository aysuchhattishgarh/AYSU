const mongoose = require('mongoose');

const contact2Schema = new mongoose.Schema({
  name: { type: String, required: true },
  picture: { type: String }, 
  designation: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model('Contact2', contact2Schema);