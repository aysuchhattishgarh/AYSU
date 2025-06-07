
import React, { useState } from 'react';

const UpdateModal = ({ student, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({ ...student });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Update Student</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input name="name" value={formData.name || ''} onChange={handleChange} placeholder="Name" className="border p-2 rounded" />
          <input name="fatherName" value={formData.fatherName || ''} onChange={handleChange} placeholder="Father's Name" className="border p-2 rounded" />
          <input name="motherName" value={formData.motherName || ''} onChange={handleChange} placeholder="Mother's Name" className="border p-2 rounded" />
          <input name="age" type="number" value={formData.age || ''} onChange={handleChange} placeholder="Age" className="border p-2 rounded" />
          <input name="mobile" value={formData.mobile || ''} onChange={handleChange} placeholder="Mobile" className="border p-2 rounded" />
          <input name="email" value={formData.email || ''} onChange={handleChange} placeholder="Email" className="border p-2 rounded" />
          <input name="division" value={formData.division || ''} onChange={handleChange} placeholder="Division" className="border p-2 rounded" />
          <textarea name="thoughts" value={formData.thoughts || ''} onChange={handleChange} placeholder="Thoughts" className="border p-2 rounded col-span-2" />
          <div className="col-span-2 flex justify-end space-x-2">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
