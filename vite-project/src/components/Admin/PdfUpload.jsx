import React, { useEffect, useState } from 'react'
import axios from 'axios';
const PdfUpload = ({ onClose }) => {

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [pdfs, setPdfs] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchPdfs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/pdf");
      setPdfs(res.data || []);
    } catch (err) {
      console.error("Failed to load PDFs", err);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
    } else {
      alert("Please upload a valid PDF file");
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("No file selected");

    setUploading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file); // Make sure 'file' matches backend

    try {
      await axios.post("http://localhost:3000/api/pdf/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage("Upload successful!");
      setFile(null);
      fetchPdfs();
    } catch (err) {
      console.error("PDF upload failed:", err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this PDF?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/pdf/delete/${id}`);
      fetchPdfs();
    } catch (err) {
      console.error("Failed to delete PDF:", err);
      alert("Delete failed");
    }
  }; 
  const handleDownload = (url, filename) => {
    const link = document.createElement("a");
    link.href = `${url}?fl_attachment=${filename}`;
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mb-6">
        <h2 className="text-xl font-bold mb-4 text-center">Upload PDF</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter PDF title"
          className="mb-4 w-full border rounded px-2 py-1"
        />
        <input
          type="file"
          onChange={handleFileChange}
          accept="application/pdf"
          className="mb-4"
        />
        <button
          onClick={handleUpload}
          disabled={uploading || !file}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-2"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
        <button
          onClick={onClose}
          className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
        >
          Close
        </button>
        {successMessage && (
          <p className="text-green-600 text-center mt-2">{successMessage}</p>
        )}
      </div>

      {/* PDF List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-4xl">
        {pdfs.map((pdf) => (
          <div key={pdf._id} className="bg-white  p-4 rounded shadow">
            <p className="mb-2 truncate">{pdf.title}</p>
            <button
              onClick={() =>
                handleDownload(pdf.url, pdf.filename || "file.pdf")
              }
              className="text-blue-500 underline"
            >
              Download PDF
            </button>

            <button
              onClick={() => handleDelete(pdf._id)}
              className="mt-2 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 block"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PdfUpload