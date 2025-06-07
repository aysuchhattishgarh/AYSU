const mongoose = require('mongoose');

const pdfFileSchema = new mongoose.Schema({
  title: { type: String, required: true },      // Title entered by admin
  filename: { type: String, required: true },   // Original file name
  url: { type: String, required: true },        // Cloudinary URL
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('PdfFile', pdfFileSchema);
