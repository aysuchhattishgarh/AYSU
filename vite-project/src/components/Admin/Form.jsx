import React, { useState } from 'react'

const Form = ({ setShowForm }) => {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${name}\nReason: ${reason}`);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Submit Your Reason
        </h2>
        <label className="block mb-2 text-gray-700">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter your name"
          required
        />
        <label className="block mb-2 text-gray-700">Reason:</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter your reason"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
        <button
          onClick={() => setShowForm(false)}
          className="w-full mt-2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition duration-300"
        >
          Close
        </button>
      </form>
    </div>
  );
};

export default Form