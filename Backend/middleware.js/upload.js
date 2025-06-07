const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Image upload (jpg, png, jpeg)
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "tribal_students/images",
    allowed_formats: ["jpg", "png", "jpeg"],
    resource_type: "image",
  },
});

// PSD upload (raw file type)
const pdfStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "pdf_uploads",
    resource_type: "raw", // important for non-images (pdf, docs)
    type: "upload",
    format: async () => "pdf", // enforce pdf extension
    public_id: (req, file) => Date.now().toString(),
  },
});



const imageUpload = multer({ storage: imageStorage });
const pdfUpload = multer({ storage: pdfStorage });

module.exports = { imageUpload, pdfUpload };



