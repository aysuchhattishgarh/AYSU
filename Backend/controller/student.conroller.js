// controller/student.controller.js
const TribalStudent = require('../model/TribalStudent');

exports.submitForm = async (req, res) => {
  try {
    const {
      name,
      gender,
      fatherName,
      motherName,
      gotra,
      caste,
      qualification,
      age,
      mobile,
      bloodGroup,
      permanentAddress,
      localAddress,
      email,
      interest,
      thoughts,
      objective,
      division,
    } = req.body;

    const photo = req.file?.path; // e.g. Cloudinary URL from multer

    const newStudent = new TribalStudent({
      name,
      gender,
      fatherName,
      motherName,
      gotra,
      caste,
      qualification,
      age,
      mobile,
      bloodGroup,
      permanentAddress,
      localAddress,
      email,
      interests: interest,
      thoughts,
      purpose: objective,
      division,
      photo,
    });

    await newStudent.save();

    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (err) {
    res.status(500).json({
      message: 'Error submitting form',
      error: err.message,
    });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    console.log("📡 API HIT: getAllStudents");
    const students = await TribalStudent.find();
    console.log("✅ Students found:", students.length);
    res.status(200).json(students);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ message: "Error fetching students", error: err.message });
  }
};

exports.getPendingStudents = async (req, res) => {
  try {
    const pendingStudents = await TribalStudent.find({ status: "pending" });
    res.status(200).json(pendingStudents);
  } catch (err) {
    res.status(500).json({ message: "Error fetching pending students", error: err.message });
  }
};
exports.getApprovedStudents = async (req, res) => {
  try {
    const approvedStudents = await TribalStudent.find({ status: "approved" });
    res.status(200).json(approvedStudents);
  } catch (err) {
    res.status(500).json({ message: "Error fetching approved students", error: err.message });
  }
};
exports.approveStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedStudent = await TribalStudent.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student approved successfully", student: updatedStudent });
  } catch (err) {
    res.status(500).json({ message: "Error approving student", error: err.message });
  }
};
exports.getRejectedStudents = async (req, res) => {
  try {
    const rejectedStudents = await TribalStudent.find({ status: "rejected" });
    res.status(200).json(rejectedStudents);
  } catch (err) {
    res.status(500).json({ message: "Error fetching rejected students", error: err.message });
  }
};
exports.rejectStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedStudent = await TribalStudent.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student rejected successfully", student: updatedStudent });
  } catch (err) {
    res.status(500).json({ message: "Error rejecting student", error: err.message });
  }
};
exports.updateStudentDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // If a new photo is uploaded, include it
    if (req.file?.path) {
      updates.photo = req.file.path;
    }

    const updatedStudent = await TribalStudent.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student details updated successfully",
      student: updatedStudent,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating student", error: err.message });
  }
};
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudent = await TribalStudent.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully", student: deletedStudent });
  } catch (err) {
    res.status(500).json({ message: "Error deleting student", error: err.message });
  }
};
