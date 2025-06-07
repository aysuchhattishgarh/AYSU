import { useEffect, useState } from "react";
import axios from "axios";

const EventList = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/events/get");
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/events/${id}`);
      setEvents(events.filter((event) => event._id !== id));
    } catch (err) {
      console.error("Failed to delete event", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow mt-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">All Events</h2>
      {events.length === 0 ? (
        <p className="text-gray-600">No events found.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li
              key={event._id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-medium">
                  {event.date.day} {event.date.month} {event.date.year}
                </p>
                <p className="text-sm text-gray-700">{event.description}</p>
              </div>
              <button
                onClick={() => handleDelete(event._id)}
                className="text-red-600 hover:underline text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
