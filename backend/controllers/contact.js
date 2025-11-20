const Contact = require("../models/ContactModel");

const createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !phone || !subject || !message) {
      return res.status(404).json({ status: "N", error: "All fields are required !" })
    }
    const newContact = new Contact({
      name, email, phone, subject, message
    })
    await newContact.save();
    return res.status(201).json({ status: "Y", message: "Thank you! we will contact you ASAP !" })
  } catch (error) {
    return res.status(500).json({ status: "N", error: `Internal error ${error} ` })
  }
}

const getContact = async (req, res) => {
  try {
    const contacts = await Contact.find()
    if (!contacts || contacts.length === 0) {
      return res.status(400).json({ status: "Y", message: "No data found !" })
    }
    res.status(200).json({ status: "Y", message: "success", data: contacts })
  } catch (error) {
    return res.status(500).json({ status: "N", error: `Internal error ${error} ` })
  }
}

const deleteContact = async (req, res) => {
  try {
    let id = req.params.id;
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(400).json({ status: "N", message: "No data found !" })
    }
    return res.status(200).json({ status: "Y", message: "Contact deleted Success !" })
  } catch (error) {
    return res.status(500).json({ status: "N", error: `Internal error ${error} ` })
  }
}

module.exports = { createContact, getContact, deleteContact }