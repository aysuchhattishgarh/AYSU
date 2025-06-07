const PdfFile = require('../model/PdfFile')

const uploadPdf = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    if (!req.file) return res.status(400).json({ error: 'File is required' });

    // req.file.path contains Cloudinary URL
    const newPdf = new PdfFile({
      title,
      filename: req.file.originalname,
      url: req.file.path, 
    });

    await newPdf.save();

    res.status(200).json({
      message: 'File uploaded successfully',
      file: newPdf,
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: err.message });
  }
}

const getAllPdfFiles = async (req, res) => {
  try {
    const files = await PdfFile.find().sort({ uploadedAt: -1 });
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const deletePdf = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await PdfFile.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.status(200).json({ message: 'PDF deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  uploadPdf,
  getAllPdfFiles,
  deletePdf,
}; 