const express = require('express');
const { addEvent, getEvents, deleteEvent } = require('../controller/event.controller');
const router = express.Router();

router.post('/add',addEvent);
router.get('/get', getEvents);
router.delete("/:id", deleteEvent);

module.exports = router; 