const exp = require('express');
const router = exp.Router();
const { createContact, getContact, deleteContact } = require("../controllers/contact");
const authenticate = require("../middleware/authenticate");


router.post("/", createContact);
router.get("/",  authenticate,getContact);
router.delete("/:id", authenticate, deleteContact);

module.exports = router;