const express = require('express');
const router = express.Router();
const studentController = require('../controller/student.conroller');
const {imageUpload} = require('../middleware.js/upload');

router.post('/submit-student-form', imageUpload.single('photo'), studentController.submitForm);
// New route to get all students
router.get('/all-students', studentController.getAllStudents);

router.get('/pending-students', studentController.getPendingStudents);
router.get("/approved-students", studentController.getApprovedStudents);
router.put("/approve-student/:id", studentController.approveStudent);
router.get('/rejected-students', studentController.getRejectedStudents);
router.put("/reject-student/:id", studentController.rejectStudent);
router.delete('/delete-student/:id', studentController.deleteStudent);
router.put('/update-student/:id', imageUpload.single('photo'), studentController.updateStudentDetails);
module.exports = router;
