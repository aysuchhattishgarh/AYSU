import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactUpload = () => {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null); // Modal state

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/contact1/all");
      setContacts(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !designation) return alert("Please fill required fields");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("designation", designation);
    formData.append("mobile", mobile);
    formData.append("email", email);
    if (picture) formData.append("picture", picture);

    try {
      await axios.post("http://localhost:3000/api/contact1/create", formData);
      setName("");
      setDesignation("");
      setMobile("");
      setEmail("");
      setPicture(null);
      fetchContacts();
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/contact1/delete/${id}`);
      fetchContacts();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const EditContactModal = ({ contact, onClose }) => {
    const [updatedName, setUpdatedName] = useState(contact.name);
    const [updatedDesignation, setUpdatedDesignation] = useState(contact.designation);
    const [updatedMobile, setUpdatedMobile] = useState(contact.mobile);
    const [updatedEmail, setUpdatedEmail] = useState(contact.email);
    const [updatedPicture, setUpdatedPicture] = useState(null);

    const handleUpdate = async () => {
      const formData = new FormData();
      formData.append("name", updatedName);
      formData.append("designation", updatedDesignation);
      formData.append("mobile", updatedMobile);
      formData.append("email", updatedEmail);
      if (updatedPicture) formData.append("picture", updatedPicture);

      try {
        await axios.put(`http://localhost:3000/api/contact1/update/${contact._id}`, formData);
        onClose();
        fetchContacts();
      } catch (err) {
        console.error("Update error:", err);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h3 className="text-lg font-bold mb-4">Update Contact</h3>

          <input className="w-full border p-2 mb-2" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
          <input className="w-full border p-2 mb-2" value={updatedDesignation} onChange={(e) => setUpdatedDesignation(e.target.value)} />
          <input className="w-full border p-2 mb-2" value={updatedMobile} onChange={(e) => setUpdatedMobile(e.target.value)} />
          <input className="w-full border p-2 mb-2" value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} />
          <input className="w-full mb-4" type="file" onChange={(e) => setUpdatedPicture(e.target.files[0])} />

          <div className="flex justify-end gap-3">
            <button className="bg-gray-400 px-4 py-2 rounded text-white" onClick={onClose}>Cancel</button>
            <button className="bg-green-600 px-4 py-2 rounded text-white" onClick={handleUpdate}>Update</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload Contact</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="w-full border p-2" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input className="w-full border p-2" type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="Designation" required />
        <input className="w-full border p-2" type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile" />
        <input className="w-full border p-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className="w-full" type="file" accept="image/*" onChange={(e) => setPicture(e.target.files[0])} />
        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">Upload</button>
      </form>

      <hr className="my-6" />

      <h3 className="text-lg font-semibold mb-2">Existing Contacts</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {contacts.map((contact) => (
          <div key={contact._id} className="border p-3 rounded shadow flex gap-3">
            {contact.picture ? (
              <img src={contact.picture} alt={contact.name} className="w-16 h-16 object-cover rounded-full" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                {contact.name.split(" ").map(n => n[0]).join("")}
              </div>
            )}
            <div className="flex-1">
              <h4 className="font-bold">{contact.name}</h4>
              <p>{contact.designation}</p>
              <p>{contact.mobile}</p>
              <p>{contact.email}</p>
              <div className="mt-2 flex gap-2">
                <button onClick={() => setEditingContact(contact)} className="text-blue-600 text-sm">Edit</button>
                <button onClick={() => handleDelete(contact._id)} className="text-red-600 text-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {editingContact && (
        <EditContactModal contact={editingContact} onClose={() => setEditingContact(null)} />
      )}
    </div>
  );
};

export default ContactUpload;
