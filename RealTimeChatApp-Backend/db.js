import mongoose from "mongoose";

export const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connection established successfully.");
  } catch (error) {
    console.log("Database connection failed::", error);
  }
};
