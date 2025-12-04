import dotenv from "dotenv";
import fs from "fs";
import mongoose from "mongoose";
import path from "path";

dotenv.config();

const url = "MONGODB URL TO ADD DATA TO MONGODB"
// ✅ MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  }
};

// ✅ Generic Donor Schema
const donorSchema = new mongoose.Schema(
  {
    name: String,
    bloodGroup: String,
    mobileNumber: String,
    city: String,
    address: String,
    email: String,
    dob: String
  },
  { strict: false }
);

// ✅ Get Dynamic Model (City as Collection)
const getModel = (collectionName) => {
  return mongoose.models[collectionName] ||
    mongoose.model(collectionName, donorSchema, collectionName);
};

// ✅ Import JSON Data
const importData = async () => {
  await connectDB();

  const dataFolder = path.join("/Users/SaiKalyan/Desktop/PluseConnect/backend", "data");

  const files = fs.readdirSync(dataFolder).filter(file => file.endsWith(".json"));

  if (files.length === 0) {
    console.log("❌ No JSON files found in data folder");
    process.exit(1);
  }

  for (const file of files) {
    try {
      const cityName = file.replace(".json", "").toLowerCase();
      const filePath = path.join(dataFolder, file);

      const rawData = fs.readFileSync(filePath, "utf-8");
      const donors = JSON.parse(rawData);

      const Model = getModel(cityName);

      // ✅ OPTIONAL: Clear collection before insert
      // await Model.deleteMany({});

      const result = await Model.insertMany(donors);

      console.log(`${result.length} records inserted into '${cityName}' collection`);
    } catch (err) {
      console.error(`Failed for file ${file}:`, err.message);
    }
  }

  console.log("All city data imported successfully");
  process.exit(0);
};


importData();
