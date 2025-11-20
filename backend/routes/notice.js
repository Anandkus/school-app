const exp = require('express');
const router = exp.Router();
const { createNotice, getNotice, deleteNotice, updateNotice } = require("../controllers/notice")
const authenticate = require("../middleware/authenticate");

router.post("/",authenticate, createNotice);
router.get("/", getNotice);
router.delete("/:id",authenticate, deleteNotice)
router.put("/:id",authenticate, updateNotice)

module.exports = router;