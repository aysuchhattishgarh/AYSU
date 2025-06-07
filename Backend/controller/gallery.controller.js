const GalleryPhoto = require('../model/GalleryPhotos.js');
const cloudinary = require('../config/cloudinary.js');

const uploadPhoto = async (req, res) => {
  try {
    const { caption } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'gallery_photos',
    });

    const photo = new GalleryPhoto({
      imageUrl: result.secure_url,
      caption,
    });

    await photo.save();
    res.status(201).json({ success: true, photo });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Upload failed', error });
  }
};

// Get all photos
const getAllPhotos = async (req, res) => {
  try {
    const photos = await GalleryPhoto.find().sort({ uploadedAt: -1 });
    res.json({ success: true, photos });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch photos' });
  }
};
const deletePhoto = async (req, res) => {
  try {
    const photo = await GalleryPhoto.findById(req.params.id);
    if (!photo) return res.status(404).json({ message: 'Photo not found' });

    // Extract Cloudinary public_id from URL
    const segments = photo.imageUrl.split('/');
    const filename = segments[segments.length - 1].split('.')[0];
    const publicId = `galleryphotos/${filename}`;

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Delete from MongoDB
    await photo.deleteOne();

    res.json({ success: true, message: 'Photo deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Delete failed', error });
  }
};

module.exports = {
  uploadPhoto,
  getAllPhotos,
  deletePhoto,
};