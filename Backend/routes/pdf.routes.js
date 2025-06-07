const express = require('express');
const { pdfUpload } = require('../middleware.js/upload');
const { uploadPdf, getAllPdfFiles, deletePdf } = require('../controller/pdf.controller');
const router = express.Router();

router.post('/upload', pdfUpload.single('file'), uploadPdf);
router.get('/', getAllPdfFiles);
router.delete('/delete/:id', deletePdf);
 
module.exports = router; 