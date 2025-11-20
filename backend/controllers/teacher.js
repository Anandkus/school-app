const Teacher = require("../models/TeacherModel");

const createTeacher = async (req, res) => {
  try {
    const { name,designation,bio,subject,image  } = req.body;
    if (!name || !designation || !bio || !subject || !image ) {
      return res.status(400).json({ status: "N", error: "All fields are required !" })
    }
    const newTeachers = new Teacher({
     name,designation,bio,subject,image
    })
    await newTeachers.save();
    return res.status(201).json({ status: "Y", message: "Thank you! Teacher create success !" })
  } catch (error) {
    return res.status(500).json({ status: "N", error: `Internal error ${error} ` })
  }
}

const getTeacher = async (req, res) => {
  try {
    const Teachers = await Teacher.find()
    if (!Teachers || Teachers.length === 0) {
      return res.status(400).json({ status: "Y", message: "No data found !" })
    }
    res.status(200).json({ status: "Y", message: "success", data: Teachers })
  } catch (error) {
    return res.status(500).json({ status: "N", error: `Internal error ${error} ` })
  }
}

const deleteTeacher = async (req, res) => {
  try {
    let id = req.params.id;
    const Teachers = await Teacher.findByIdAndDelete(id);
    if (!Teachers) {
      return res.status(400).json({ status: "N", message: "No data found !" })
    }
    return res.status(200).json({ status: "Y", message: "deleted Success !" })
  } catch (error) {
    return res.status(500).json({ status: "N", error: `Internal error ${error} ` })
  }
}

const updateTeacher = async (req, res) => {
  try {
    let id = req.params.id;
    const Teachers = await Teacher.findByIdAndUpdate(id, req.body);
    if (!Teachers) {
      return res.status(400).json({ status: "N", message: "data not available !" })
    }
    return res.status(200).json({ status: "Y", message: "Update success !" })
  } catch (error) {
    return res.status(500).json({ status: "N", error: `Internal error ${error} ` })
  }
}
module.exports = { createTeacher, getTeacher, deleteTeacher, updateTeacher }