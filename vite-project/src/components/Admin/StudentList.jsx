import React, { useState } from "react";

const StudentList = ({
  title,
  students,
  onClose,
  onApprove,
  handleReject,
  handleUpdate,
  handleDelete
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = Array.isArray(students)
    ? students.filter((s) =>
        Object.values(s)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 overflow-auto">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[95vw] max-w-[1500px]">
        <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>

        {/* Search Input */}
        <div className="mb-4 text-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 rounded w-full max-w-md"
          />
        </div>

        {!Array.isArray(students) ? (
          <p className="text-red-500">Error: Invalid data format</p>
        ) : filteredStudents.length === 0 ? (
          <p className="text-gray-600">No records found.</p>
        ) : (
          <div className="overflow-auto px-40">
            <table
              className="min-w-full table-auto border-collapse border border-gray-300 text-sm"
              aria-label="Student list table"
            >
              <thead className="bg-gray-200 text-center">
                <tr>
                  <th className="border px-2 py-1">S.No.</th>
                  <th className="border px-10 py-5">Photo</th>
                  <th className="border px-2 py-1">Name</th>
                  <th className="border px-2 py-1">Gender</th>
                  <th className="border px-2 py-1">Father</th>
                  <th className="border px-2 py-1">Mother</th>
                  <th className="border px-2 py-1">Gotra</th>
                  <th className="border px-2 py-1">Caste</th>
                  <th className="border px-2 py-1">Qualification</th>
                  <th className="border px-2 py-1">Age</th>
                  <th className="border px-2 py-1">Mobile</th>
                  <th className="border px-2 py-1">Blood Group</th>
                  <th className="border px-2 py-1">Permanent Address</th>
                  <th className="border px-2 py-1">Local Address</th>
                  <th className="border px-2 py-1">Email</th>
                  <th className="border px-2 py-1">Interests</th>
                  <th className="border px-2 py-1">Thoughts</th>
                  <th className="border px-2 py-1">Purpose</th>
                  <th className="border px-2 py-1">Division</th>
                  <th className="border px-2 py-1">Status</th>
                  {onApprove && <th className="border px-2 py-1">Action</th>}
                  {handleUpdate && <th className="border px-2 py-1">Update</th>}
                  {handleDelete && <th>Delete</th>}
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s, index) => (
                  <tr key={s._id} className="text-center hover:bg-gray-100">
                    <td className="border px-2 py-1">{index + 1}</td>
                    <td className="border px-2 py-1">
                      <img
                        src={s.photo}
                        alt={s.name}
                        height={200}
                        width={200}
                        onError={(e) => {
                          e.target.src = "/fallback-user.png";
                        }}
                        className="h-32 w-32 object-cover rounded-full mx-auto"
                      />
                    </td>
                    <td className="border px-2 py-1">{s.name}</td>
                    <td className="border px-2 py-1">{s.gender}</td>
                    <td className="border px-2 py-1">{s.fatherName}</td>
                    <td className="border px-2 py-1">{s.motherName}</td>
                    <td className="border px-2 py-1">{s.gotra}</td>
                    <td className="border px-2 py-1">{s.caste}</td>
                    <td className="border px-2 py-1">{s.qualification}</td>
                    <td className="border px-2 py-1">{s.age}</td>
                    <td className="border px-2 py-1">{s.mobile}</td>
                    <td className="border px-2 py-1">{s.bloodGroup}</td>
                    <td
                      className="border px-2 py-1 truncate"
                      title={s.permanentAddress}
                    >
                      {s.permanentAddress}
                    </td>
                    <td
                      className="border px-2 py-1 truncate"
                      title={s.localAddress}
                    >
                      {s.localAddress}
                    </td>
                    <td className="border px-2 py-1">{s.email}</td>
                    <td className="border px-2 py-1">{s.interests}</td>
                    <td className="border px-2 py-1">{s.thoughts}</td>
                    <td className="border px-2 py-1">{s.purpose}</td>
                    <td className="border px-2 py-1">{s.division}</td>
                    <td className="border px-2 py-1 capitalize">{s.status}</td>

                    {onApprove && s.status === "pending" ? (
                      <td className="border px-2 py-1 space-x-2">
                        <button
                          onClick={() => onApprove(s._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(s._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </td>
                    ) : onApprove ? (
                      <td className="border px-2 py-1 text-gray-400">—</td>
                    ) : null}

                    {handleUpdate && (
                      <td className="border px-2 py-1">
                        <button
                          onClick={() => handleUpdate(s)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Update
                        </button>
                      </td>
                    )}
                    {handleDelete && (
                  <td>
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this student?")) {
                          handleDelete(s._id);
                        }
                      }}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full mt-4 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default StudentList;
