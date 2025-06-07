import React from 'react'

const Details = ({ setShowDetails, title, description }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
        <p className="text-gray-700">{description}</p>
        <button
          onClick={() => setShowDetails(false)}
          className="w-full mt-2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Details