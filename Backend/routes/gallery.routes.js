const  { getAllPhotos, uploadPhoto, deletePhoto } = require('../controller/gallery.controller');
const {imageUpload} =  require('../middleware.js/upload');

const express = require('express')

const router = express.Router();

router.post('/upload', imageUpload.single('image'), uploadPhoto);
router.get('/', getAllPhotos);
router.delete('/:id', deletePhoto);
module.exports = router;