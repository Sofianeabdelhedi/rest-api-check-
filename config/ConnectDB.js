const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.database);
    console.log("databade connected");
  } catch (error) {
    console.error(error.message);
  }
};
module.exports = connectDB;
