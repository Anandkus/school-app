const Notice = require("../models/NoticeModel");

const createNotice = async (req, res) => {
  try {
    const { title,description,date,category  } = req.body;
    if (!title || !description || !date || !category ) {
      return res.status(400).json({ status: "N", error: "All fields are required !" })
    }
    const newNotices = new Notice({
     title, description,date,category
    })
    await newNotices.save();
    return res.status(201).json({ status: "Y", message: "Thank you! Notice create success !" })
  } catch (error) {
    return res.status(500).json({ status: "N", error: `Internal error ${error} ` })
  }
}

const getNotice = async (req, res) => {
  try {
    const Notices = await Notice.find()
    if (!Notices || Notices.length === 0) {
      return res.status(400).json({ status: "Y", message: "No data found !" })
    }
    res.status(200).json({ status: "Y", message: "success", data: Notices })
  } catch (error) {
    return res.status(500).json({ status: "N", error: `Internal error ${error} ` })
  }
}

const deleteNotice = async (req, res) => {
  try {
    let id = req.params.id;
    const Notices = await Notice.findByIdAndDelete(id);
    if (!Notices) {
      return res.status(400).json({ status: "N", message: "No data found !" })
    }
    return res.status(200).json({ status: "Y", message: "deleted Success !" })
  } catch (error) {
    return res.status(500).json({ status: "N", error: `Internal error ${error} ` })
  }
}

const updateNotice = async (req, res) => {
  try {
    let id = req.params.id;
    const Notices = await Notice.findByIdAndUpdate(id, req.body);
    if (!Notices) {
      return res.status(400).json({ status: "N", message: "data not available !" })
    }
    return res.status(200).json({ status: "Y", message: "Update success !" })
  } catch (error) {
    return res.status(500).json({ status: "N", error: `Internal error ${error} ` })
  }
}
module.exports = { createNotice, getNotice, deleteNotice, updateNotice }