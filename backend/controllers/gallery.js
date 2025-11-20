const Gallery = require("../models/GalleryModel");

const createGallery = async (req, res) => {
  try {
    const { title, imagesUrl,  date,  } = req.body;
    if (!title || !imagesUrl || !date ) {
      return res.status(400).json({ status: "N", error: "All fields are required !" })
    }
    const newGallerys = new Gallery({
     title, imagesUrl,  date,
    })
    await newGallerys.save();
    return res.status(201).json({ status: "Y", message: "Thank you! Gallery create success !" })
  } catch (error) {
    return res.status(500).json({ status: "N", error: `Internal error ${error} ` })
  }
}

const getGallery = async (req, res) => {
  try {
    const Gallerys = await Gallery.find()
    if (!Gallerys || Gallerys.length === 0) {
      return res.status(400).json({ status: "Y", message: "No data found !" })
    }
    res.status(200).json({ status: "Y", message: "success", data: Gallerys })
  } catch (error) {
    return res.status(500).json({ status: "N", error: `Internal error ${error} ` })
  }
}

const deleteGallery = async (req, res) => {
  try {
    let id = req.params.id;
    const Gallerys = await Gallery.findByIdAndDelete(id);
    if (!Gallerys) {
      return res.status(400).json({ status: "N", message: "No data found !" })
    }
    return res.status(200).json({ status: "Y", message: "deleted Success !" })
  } catch (error) {
    return res.status(500).json({ status: "N", error: `Internal error ${error} ` })
  }
}

const updateGallery = async (req, res) => {
  try {
    let id = req.params.id;
    const Gallerys = await Gallery.findByIdAndUpdate(id, req.body);
    if (!Gallerys) {
      return res.status(400).json({ status: "N", message: "data not available !" })
    }
    
    return res.status(200).json({ status: "Y", message: "Update success !" })
  } catch (error) {
    return res.status(500).json({ status: "N", error: `Internal error ${error} ` })
  }
}
module.exports = { createGallery, getGallery, deleteGallery, updateGallery }