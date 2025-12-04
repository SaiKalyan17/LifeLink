import mongoose from "mongoose";

const authSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Username is required"]
  },

  mobileNumber: {
    type: String,
    required: [true, "Mobile Number is required"],
    unique: true
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },

  password: {
    type: String,
    required: [true, "Password is required"]
  },

  otp: {
    type: String
  },

  otpExpiry: {
    type: Date
  },

  isVerified: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

const Auth = mongoose.model("Auth", authSchema);
export default Auth;
