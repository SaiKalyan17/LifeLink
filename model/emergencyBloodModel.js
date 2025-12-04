import mongoose from "mongoose";

const emergencyBloodSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true 
    },

    bloodGroup: { 
      type: String, 
      required: true,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]
    },

    mobileNumber: { 
      type: String, 
      required: true,
      match: [/^[6-9]\d{9}$/, "Invalid mobile number"]
    },

    city: { 
      type: String, 
      required: true,
      trim: true,
      index: true
    },

    address: { 
      type: String, 
      required: true,
      trim: true
    },

    email: { 
      type: String, 
      required: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"]
    },

    packets: { 
      type: Number, 
      required: true,
      min: 1
    }
  },
  { timestamps: true }
);

const EmergencyBlood = mongoose.model("EmergencyBlood",emergencyBloodSchema);

export default EmergencyBlood;
