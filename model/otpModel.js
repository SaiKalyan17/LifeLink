import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true }
});

export default mongoose.model("Otp", otpSchema);
