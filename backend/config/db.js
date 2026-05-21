const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Connection error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

// async function connectDB() {
//   try {
//     await mongoose.connect(mongoURI);
//     console.log("Successfully connected to MongoDB");
//   } catch (err) {
//     console.error("Connection error:", err.message);
//     process.exit(1); // Exit process with failure
//   }
// }

module.exports = connectDB;
