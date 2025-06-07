const express = require('express');
const router = express.Router();

const authController = require('../controller/auth.contoller');
const adminController = require('../controller/admin.contoller');

router.post('/signup/user', authController.signupUser);
router.post('/login/user', authController.loginUser);
router.post('/login/admin', adminController.loginAdmin);

module.exports = router;