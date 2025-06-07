const mongoose = require('mongoose');

const galleryPhotoSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('GalleryPhoto', galleryPhotoSchema);
