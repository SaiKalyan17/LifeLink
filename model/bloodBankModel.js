import mongoose from "mongoose";

const bloodBankSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: null
    },

    address: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      trim: true,
      index: true
    },

    status: {
      type: String,   // e.g., "Open 24 Hrs", "Open Now"
      trim: true
    },

    city: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true
    },

    source: {
      type: String,
      default: "Justdial"
    }
  },
  {
    timestamps: true   // adds createdAt & updatedAt
  }
);

// ✅ Prevent duplicate blood banks in same city
bloodBankSchema.index({ name: 1, city: 1 }, { unique: true });

// ✅ Text search for fast search
bloodBankSchema.index({ name: "text", address: "text", city: "text" });

export default mongoose.model("BloodBanks", bloodBankSchema);
