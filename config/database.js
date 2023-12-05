import mongoose from "mongoose";
import fs from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const models = join(__dirname, "../models");
fs.readdirSync(models)
  .filter((file) => file.endsWith(".js"))
  .forEach((file) => {
    import(join(models, file));
  });

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default connectDatabase;
