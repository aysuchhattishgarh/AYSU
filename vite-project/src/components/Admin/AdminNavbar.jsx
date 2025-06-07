import React from "react";

const AdminNavbar = ({ setActiveView }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="h-screen w-1/4 bg-gray-800 text-white mt-20 flex flex-col items-center p-6 space-y-3">
      <h2 className="text-2xl font-bold mb-8">प्रदेश मीडिया प्रभारी</h2>

      <button
        onClick={() => setActiveView("details")}
        className="w-full py-3 bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Total
      </button>
      <button
        onClick={() => setActiveView("pending")}
        className="w-full py-3 bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Pending
      </button>
      <button
        onClick={() => setActiveView("rejected")}
        className="w-full py-3 bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Rejected
      </button>
      <button
        onClick={() => setActiveView("image")}
        className="w-full py-3 bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Upload Photo
      </button>
      <button
        onClick={() => setActiveView("pdf")}
        className="w-full py-3 bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Upload PDF
      </button>
      <button
        onClick={() => setActiveView("event")}
        className="w-full py-3 bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Upload Event
      </button>
      <button
        onClick={() => setActiveView("contact")}
        className="w-full py-3 bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Upload Contacts (राज्य स्तरीय टीम)
      </button>
      <button
        onClick={() => setActiveView("contact2")}
        className="w-full py-3 bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Upload Contacts (संभाग स्तरीय टीम)
      </button>
      <button
        onClick={handleLogout}
        className="w-full py-3 bg-red-600 rounded-lg hover:bg-red-700 mt-auto"
      >
        Logout
      </button>
    </nav>
  );
};

export default AdminNavbar;
