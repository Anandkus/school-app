 require("dotenv").config({ path: './config/.env' });
const mongoose = require('mongoose');
const URL = process.env.MONGODB_URL;

const connectDb = async() => {
  mongoose.connect(URL)
    .then(() => {
      console.log('Db connected successfully');
    })
    .catch((err) => console.log('Connection error:', err));
};

module.exports = { connectDb };
