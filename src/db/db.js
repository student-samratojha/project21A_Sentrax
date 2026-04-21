const mongoose = require("mongoose");
const mongoUri = process.env.MONGO_URI;
async function connectDB() {
  try {
    await mongoose.connect(mongoUri);
    console.log("connected to mongodb");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDB;
