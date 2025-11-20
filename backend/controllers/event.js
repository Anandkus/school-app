const Event = require("../models/EventModel");

const createEvent = async (req, res) => {
  try {
    const { title, description, shortDescription, date, location,time } = req.body;
    if (!title || !description || !shortDescription || !date || !location ||!time) {
      return res.status(400).json({ status: "N", error: "All fields are required !" })
    }
    const newEvents = new Event({
      title, description, shortDescription, date, location,time
    })
    await newEvents.save();
    return res.status(201).json({ status: "Y", message: "Thank you! event create success !" })
  } catch (error) {
    return res.status(500).json({ status: "N", error: `Internal error ${error} ` })
  }
}

const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
    if (!events || events.length === 0) {
      return res.status(400).json({ status: "Y", message: "No data found !" })
    }
    res.status(200).json({ status: "Y", message: "success", data: events })
  } catch (error) {
    return res.status(500).json({ status: "N", error: `Internal error ${error} ` })
  }
}

const deleteEvent = async (req, res) => {
  try {
    let id = req.params.id;
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(400).json({ status: "N", message: "No data found !" })
    }
    return res.status(200).json({ status: "Y", message: "deleted Success !" })
  } catch (error) {
    return res.status(500).json({ status: "N", error: `Internal error ${error} ` })
  }
}

const updateEvent = async (req, res) => {
  try {
    let id = req.params.id;
    const event = await Event.findByIdAndUpdate(id, req.body);
    if (!event) {
      return res.status(400).json({ status: "N", message: "data not available !" })
    }
    return res.status(200).json({ status: "Y", message: "Update success !" })
  } catch (error) {
    return res.status(500).json({ status: "N", error: `Internal error ${error} ` })
  }
}
module.exports = { createEvent, getEvents, deleteEvent, updateEvent }