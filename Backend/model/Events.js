const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  date: {
    day: Number,
    month: String,
    year: Number
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", eventSchema);