import React, { useState } from "react";

const TribalStudentForm = () => {
  const [formData, setFormData] = useState({});
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "age" || name === "mobile") && isNaN(value)) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleRadioChange = (e) => {
    setSelectedDivision(e.target.value);
  };

  const isValidGmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "name",
      "gender",
      "fatherName",
      "motherName",
      "gotra",
      "caste",
      "qualification",
      "age",
      "mobile",
      "bloodGroup",
      "permanentAddress",
      "localAddress",
      "email",
      "interest",
      "thoughts",
      "objective",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert("कृपया सभी फ़ील्ड भरें।");
        return;
      }
    }

    if (!isValidGmail(formData.email)) {
      alert("केवल Gmail ईमेल पता मान्य है।");
      return;
    }

    if (!photo || !selectedDivision) {
      alert("कृपया सभी फ़ील्ड भरें और फोटो अपलोड करें।");
      return;
    }

    const completeForm = { ...formData, division: selectedDivision };
    const formPayload = new FormData();
    for (const key in completeForm) {
      formPayload.append(key, completeForm[key]);
    }
    formPayload.append("photo", photo);

    try {
      const response = await fetch(
        "http://localhost:3000/api/student/submit-student-form",
        {
          method: "POST",
          body: formPayload,
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("फॉर्म सफलतापूर्वक सबमिट हो गया।");
        console.log(result);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert("Server error while submitting form.");
      console.error(error);
    }
  };

  const fields = [
    { label: "नाम", name: "name" },
    {
      label: "लिंग",
      name: "gender",
      type: "select",
      options: ["Male", "Female", "Other"],
    },
    { label: "पिता का नाम", name: "fatherName" },
    { label: "माता का नाम", name: "motherName" },
    { label: "गोत्र", name: "gotra" },
    { label: "जाति", name: "caste" },
    { label: "योग्यता", name: "qualification" },
    { label: "उम्र", name: "age", type: "number", min: 1, max: 120 },
    { label: "मोबाईल", name: "mobile", type: "number" },
    { label: "ब्लड ग्रुप", name: "bloodGroup" },
    { label: "स्थायी पता", name: "permanentAddress" },
    { label: "स्थानीय पता", name: "localAddress" },
    { label: "ई-मेल", name: "email", type: "email" },
    { label: "रुचि", name: "interest" },
    { label: "समाज के प्रति विचार", name: "thoughts" },
    { label: "इस संगठन से जुड़ने के उद्देश्य", name: "objective" },
  ];

  return (
    <div className="bg-yellow-400 w-full border border-yellow-600 p-8 rounded-lg max-w-5xl mx-auto ">
      <h2 className="text-3xl font-bold mb-8 mt-20 text-center text-gray-900">
        आदिवासी युवा छात्र संगठन-छत्तीसगढ़
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Photo Upload */}
        <div className="flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="mb-4"
          />
          {photoPreview && (
            <img
              src={photoPreview}
              alt="Uploaded Preview"
              className="w-40 h-40 object-cover rounded-lg shadow-md"
            />
          )}
        </div>

        {/* Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map(({ label, name, type = "text", options, min, max }) => (
            <div key={name} className="flex flex-col">
              <label
                htmlFor={name}
                className="font-semibold mb-1 text-gray-800"
              >
                {label}
              </label>

              {type === "select" ? (
                <select
                  id={name}
                  name={name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="">चयन करें</option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={name}
                  type={type}
                  name={name}
                  min={min}
                  max={max}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              )}
            </div>
          ))}
        </div>

        {/* Division Radio Buttons */}
        <div>
          <label className="block font-semibold mb-2 text-gray-800">
            संभाग
          </label>
          <div className="flex flex-wrap gap-6">
            {["रायपुर", "बिलासपुर", "दुर्ग", "सरगुजा", "बस्तर"].map(
              (division) => (
                <label
                  key={division}
                  className="inline-flex items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    name="division"
                    value={division}
                    checked={selectedDivision === division}
                    onChange={handleRadioChange}
                    className="form-radio text-yellow-500"
                  />
                  <span className="ml-2 text-gray-800">{division}</span>
                </label>
              )
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-600 text-white font-semibold py-3 rounded-md hover:bg-yellow-700 transition-colors"
        >
          सबमिट करें
        </button>
      </form>
    </div>
  );
};

export default TribalStudentForm;
