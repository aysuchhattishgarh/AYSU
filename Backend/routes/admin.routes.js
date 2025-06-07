const express = require('express');
const router = express.Router();

const adminController = require('../controller/admin.contoller');
const { authenticateJWT, isAdmin } = require('../middleware.js/auth');

router.get('/users', authenticateJWT, isAdmin, adminController.getAllUsers);

module.exports = router;
