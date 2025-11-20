const exp = require('express');
const router = exp.Router();
const { createTeacher, getTeacher, deleteTeacher, updateTeacher } = require("../controllers/teacher")
const authenticate = require("../middleware/authenticate");

router.post("/",authenticate, createTeacher);
router.get("/", getTeacher);
router.delete("/:id",authenticate, deleteTeacher)
router.put("/:id",authenticate, updateTeacher)

module.exports = router;