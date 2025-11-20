const exp = require('express');
const router = exp.Router();
const { createGallery, getGallery, deleteGallery, updateGallery } = require("../controllers/gallery");
const authenticate = require("../middleware/authenticate");

router.post("/",authenticate, createGallery);
router.get("/", getGallery);
router.delete("/:id",authenticate, deleteGallery)
router.put("/:id", authenticate,updateGallery)

module.exports = router;