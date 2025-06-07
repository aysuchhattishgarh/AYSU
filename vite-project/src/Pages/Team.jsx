
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Contact = () => {

const [contacts, setContacts] = useState([]);

useEffect(() => {
  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/contact1/all");
      setContacts(res.data);
    } catch (err) {
      console.error("Failed to fetch contacts", err);
    }
  };
  fetchContacts();
}, []);


  return (
    <div
      className="w-full p-8 rounded-lg border border-gray-300"
      style={{ backgroundColor: "rgb(150, 208, 164)" }}
    >
      <h2 className="text-3xl mt-20 font-bold mb-8 text-center text-gray-900">
        राज्य स्तरीय टीम
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow"
          >
            {/* Show picture or fallback placeholder */}
            {contact.picture ? (
              <img
                src={contact.picture}
                alt={contact.name}
                className="w-20 h-20 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-400 flex items-center justify-center text-white text-xl font-semibold flex-shrink-0">
                {contact.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {contact.name}
              </h3>
              <p className="text-gray-700">{contact.designation}</p>
              <p className="text-gray-600">📞 {contact.mobile}</p>
              <p className="text-gray-600">✉️ {contact.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
