// db/seed.js
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/User");

const dummyUsers = [
  { name: "admin", email: "admin@admin.com", role: "admin", password: "admin" },
];

async function connectDB() {
  await mongoose.connect(
    process.env.MONGO_URL || "mongodb://127.0.0.1:27017/shop_nest",
  );
  console.log("MongoDB Connected");
}

async function seedDatabase() {
  try {
    await connectDB();
    for (const user of dummyUsers) {
      const existingUser = await User.findOne({ email: user.email });
      if (existingUser) {
        console.log("Database already seeded!");
        continue;
      }
      await User.create(user);
    }
    // Insert new records

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seedDatabase();
