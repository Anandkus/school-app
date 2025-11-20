const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ status: "N", error: "All fields are required !" })
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ status: "N", error: "User already exists !" })
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUsers = new User({
      name, email, password: hashPassword
    })
    await newUsers.save();
    return res.status(201).json({ status: "Y", message: "Thank you! User register success !" })
  } catch (error) {
    return res.status(500).json({ status: "N", error: `Internal error ${error} ` })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: "N", error: "All fields are required !" })
    }
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).json({ status: "N", error: " Invalid email or password ! !" })
    }
    const isValidPassword = await bcrypt.compare(password, existUser.password);
    if (!isValidPassword) {
      return res.status(400).json({ status: "N", error: " Invalid email or password !" })
    }
    const token = jwt.sign({ userId: existUser._id, email: existUser.email, name: existUser.name }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const decoded = jwt.decode(token);
    const expiresAt = new Date(decoded.exp * 1000);

    return res.status(200).json({ status: "Y", message: "Thank you! User login success !", token, expiresAt, user: { userId: existUser._id, email: existUser.email, name: existUser.name } })

  } catch (error) {
    return res.status(500).json({ status: "N", error: `Internal error ${error} ` })
  }
}
module.exports = { createSignUp, loginUser }