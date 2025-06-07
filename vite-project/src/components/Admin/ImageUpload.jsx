import React, { useEffect, useState } from 'react'
import axios from 'axios';
const ImageUpload = ({ onClose }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [photos, setPhotos] = useState([]);

  const fetchPhotos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/gallery");
      setPhotos(res.data.photos || []);
    } catch (err) {
      console.error("Failed to load photos", err);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image");

    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", "Uploaded by Admin");

    try {
      await axios.post("http://localhost:3000/api/gallery/upload", formData);
      setSuccessMessage("Upload successful!");
      setImage(null);
      setPreview("");
      fetchPhotos(); // Refresh photo list
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (photoId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/gallery/${photoId}`);
      fetchPhotos();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete photo");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mb-6">
        <h2 className="text-xl font-bold mb-4 text-center">Upload Photo</h2>
        <input type="file" onChange={handleFileChange} className="mb-4" />
        {preview && (
          <img
            src={preview}
            width={50}
            height={50}
            alt="Preview"
            className="mb-4 w-full h-48 object-cover rounded"
          />
        )}
        <button
          onClick={handleUpload}
          disabled={uploading}
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

      {/* Photo Gallery Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl">
        {photos.map((photo) => (
          <div
            key={photo._id}
            className="bg-white rounded shadow overflow-hidden relative"
          >
            <img
              src={photo.imageUrl}
              alt="Uploaded"
              className="w-full h-48 object-cover"
            />
            <div className="p-2">
              <p className="text-sm">{photo.caption}</p>
              <button
                onClick={() => handleDelete(photo._id)}
                className="mt-2 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default ImageUpload