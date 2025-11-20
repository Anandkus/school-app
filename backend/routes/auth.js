const exp = require('express');
const router = exp.Router();
const { createSignUp, loginUser } = require("../controllers/user")


router.post("/signUp", createSignUp);
router.post("/login", loginUser);

module.exports = router;