import React, { useState } from "react";

const Navbar = ({ setShowForm, setShowDetails, setShowPending, setShowRejected }) => {
  return (
    <div className="h-screen w-1/4 bg-gray-800 text-white flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-6">संभाग</h2>
      <button className="w-full py-2 my-1 bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300">Home</button>
      <button onClick={() => setShowDetails(true)} className="w-full py-2 my-1 bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300">Total</button>
      <button onClick={() => setShowPending(true)} className="w-full py-2 my-1 bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300">Pending</button>
      <button onClick={() => setShowRejected(true)} className="w-full py-2 my-1 bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300">Rejected</button>
      <button onClick={() => setShowForm(true)} className="w-full py-2 my-1 bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300">Application Request</button>
      <button className="w-full py-2 my-1 bg-red-500 rounded-lg hover:bg-red-600 transition duration-300">Logout</button>
    </div>
  );
};

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
        <h2 className="text-2xl font-bold mb-4 text-center">Submit Your Reason</h2>
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

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showPending, setShowPending] = useState(false);
  const [showRejected, setShowRejected] = useState(false);

  return (
    <div className="flex">
      <Navbar setShowForm={setShowForm} setShowDetails={setShowDetails} setShowPending={setShowPending} setShowRejected={setShowRejected} />
      {showForm && <Form setShowForm={setShowForm} />}
      {showDetails && <Details setShowDetails={setShowDetails} title="Total Details" description="Here are the total details..." />}
      {showPending && <Details setShowDetails={setShowPending} title="Pending Details" description="Here are the pending details..." />}
      {showRejected && <Details setShowDetails={setShowRejected} title="Rejected Details" description="Here are the rejected details..." />}
    </div>
  );
};

export default App;
