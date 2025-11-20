const exp = require('express');
const router = exp.Router();
const { createEvent, getEvents, deleteEvent, updateEvent } = require("../controllers/event");
const authenticate = require("../middleware/authenticate");

router.post("/",authenticate, createEvent);
router.get("/", getEvents);
router.delete("/:id",authenticate, deleteEvent)
router.put("/:id",authenticate, updateEvent)

module.exports = router;