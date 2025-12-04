import mongoose from "mongoose";

export const donorSchema = new mongoose.Schema(
    {
      name: { 
        type: String, 
        required: true 
    },
      bloodGroup: { 
        type: String, 
        required: true 
    },
      mobileNumber: { 
        type: String, 
        required: true 
    },
      city: { 
        type: String, 
        required: true 
    },
      address: { 
        type: String, 
        required: true
    },
      email: { 
        type: String, 
        required: true 
    },
      dob: { 
        type: String, 
        required: true 
    }
    },
    { timestamps: true }
  );
  


export const getDonorModel = (cityName) => {
  const collectionName = cityName.toLowerCase();
  return (
    mongoose.models[collectionName] ||
    mongoose.model(collectionName, donorSchema, collectionName)
  );
};

