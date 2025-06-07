const express = require("express");
const Event = require("../model/Events");

const addEvent = async (req, res) => {
  try {
    const { day, month, year, description } = req.body;

    if (!day || !month || !year || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newEvent = new Event({ date: { day, month, year }, description });
    await newEvent.save();
    res.status(201).json({ message: "Event added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add event" });
  }
};


const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    events.sort((a, b) => {
      const aDate = new Date(`${a.date.month} ${a.date.day}, ${a.date.year}`);
      const bDate = new Date(`${b.date.month} ${b.date.day}, ${b.date.year}`);
      return aDate - bDate;
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
};
module.exports = {
  addEvent,
  getEvents,
  deleteEvent
};