import React from "react";
import { useLocation } from "react-router-dom";

const MyDocumentPDF = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedUrl = queryParams.get("file");
  const fileUrl = decodeURIComponent(encodedUrl); // ✅ Decode the URL

  return (
    <iframe
      src={fileUrl}
      style={{ width: "100%", height: "100vh", border: "none" }}
      title="PDF Viewer"
    ></iframe>
  );
};

export default MyDocumentPDF;
