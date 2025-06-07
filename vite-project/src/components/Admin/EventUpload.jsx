import { useState } from "react";
import axios from "axios";
import EventList from "./EventList";

const EventUpload = ({ onClose }) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/events/add", {
        day,
        month,
        year,
        description,
      });
      setMessage("Event uploaded successfully!");
      setDay("");
      setMonth("");
      setYear(new Date().getFullYear());
      setDescription("");
    } catch (err) {
      setMessage("Error uploading event");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 mt-20">Upload Upcoming Event</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="number"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          placeholder="Day"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          placeholder="Month (e.g., April)"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Year (e.g., 2025)"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Event Description"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
        {message && <p className="text-sm text-green-600">{message}</p>}
        <button onClick={onClose} className="text-sm text-gray-500 mt-2">
          Close
        </button>
      </form>
      <EventList/>
    </div>
  );
};

export default EventUpload;
