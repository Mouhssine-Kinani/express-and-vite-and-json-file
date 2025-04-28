import { config } from "dotenv";

config();

export const {
  PORT,
  DB_URL: MONGODB_URI
} = process.env;