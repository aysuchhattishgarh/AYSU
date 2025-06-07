import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentList from "../components/Admin/StudentList";
import AdminNavbar from "../components/Admin/AdminNavbar";
import PdfUpload from "../components/Admin/PdfUpload";
import ImageUpload from "../components/Admin/ImageUpload";
import EventUpload from "../components/Admin/EventUpload";
import UpdateModal from "../components/Admin/UpdateModal";
import ContactUpload from "../components/Admin/ContactUpload";
import ContactUpload2 from "../components/Admin/ContactUpload2";

const App = () => {
  const [activeView, setActiveView] = useState(null);
  // values can be: 'form', 'details', 'pending', 'rejected', 'pdf', 'image', 'event'

  const [allStudents, setAllStudents] = useState([]);
  const [pendingStudents, setPendingStudents] = useState([]);
  const [rejectedStudents, setRejectedStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const fetchAllData = async () => {
    try {
      const [all, pending, rejected] = await Promise.all([
        axios.get("http://localhost:3000/api/student/all-students"),
        axios.get("http://localhost:3000/api/student/pending-students"),
        axios.get("http://localhost:3000/api/student/rejected-students"),
      ]);

      console.log("All Students:", all.data);
      console.log("Pending Students:", pending.data);
      console.log("Rejected Students:", rejected.data);

      setAllStudents(all.data);
      setPendingStudents(pending.data);
      setRejectedStudents(rejected.data);
    } catch (err) {
      console.error(
        "Error fetching students:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);
  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/student/reject-student/${id}`);
      fetchAllData(); // refresh after rejection
    } catch (err) {
      console.error(
        "Error rejecting student:",
        err.response?.data || err.message
      );
    }
  };

  const handleApprove = async (id) => {
    await axios.put(`http://localhost:3000/api/student/approve-student/${id}`);
    fetchAllData(); // refresh after approving
  };
  const handleUpdate = (student) => {
    setEditStudent(student); // open modal
  };

  const handleUpdateSubmit = async (updatedData) => {
    try {
      await axios.put(
        `http://localhost:3000/api/student/update-student/${updatedData._id}`,
        updatedData
      );
      setEditStudent(null);
      fetchAllData();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/student/delete-student/${id}`
      );
      fetchAllData();
    } catch (err) {
      console.error(
        "Error deleting student:",
        err.response?.data || err.message
      );
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNavbar setActiveView={setActiveView} />

      <div className="flex-1 p-6 overflow-auto mt-20">
        {activeView === "pdf" && (
          <PdfUpload onClose={() => setActiveView(null)} />
        )}
        {activeView === "details" && (
          <StudentList
            title="Total Students"
            students={allStudents}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            onClose={() => setActiveView(null)}
          />
        )}
        {activeView === "pending" && (
          <StudentList
            title="Pending Students"
            students={pendingStudents}
            onApprove={handleApprove}
            handleReject={handleReject}
            handleDelete={handleDelete}
            onClose={() => setActiveView(null)}
          />
        )}
        {activeView === "rejected" && (
          <StudentList
            title="Rejected Students"
            students={rejectedStudents}
            handleDelete={handleDelete}
            onClose={() => setActiveView(null)}
          />
        )}
        {activeView === "event" && (
          <EventUpload onClose={() => setActiveView(null)} />
        )}
        {activeView === "image" && (
          <ImageUpload onClose={() => setActiveView(null)} />
        )}
        {activeView === "contact" && (
          <ContactUpload onClose={() => setActiveView(null)} />
        )}
        {activeView === "contact2" && (
          <ContactUpload2 onClose={() => setActiveView(null)} />
        )}
        {editStudent && (
          <UpdateModal
            student={editStudent}
            onUpdate={handleUpdateSubmit}
            onClose={() => setEditStudent(null)}
          />
        )}
      </div>
    </div>
  );
};

export default App;
