import mongoose from "mongoose";
import { MONGODB_URI, PORT } from "./env.js";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB Connected sur le port ${PORT}...`);
  } catch (err) {
    console.error("Erreur de connexion à MongoDB:", err.message);
    process.exit(1);
  }
};

export default connectDB;
