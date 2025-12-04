import mongoose from "mongoose";
import { getDonorModel } from "../../model/donorModel.js";
const excludedCollections = [
  "auths",
  "users",
  "logs",
  "sessions",
  "tokens",
  "admins",
  "configs",
  "emergencybloods",
  "bloodbanks"
];

export const getOnlyCities = async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();

    const cityCollections = collections.map(col => col.name).filter(name => !excludedCollections.includes(name));

    if (cityCollections.length === 0) {
      return res.status(404).json({ success: false, message: "No city collections found"});
    }

    res.status(200).json({
      success: true,
      count: cityCollections.length,
      data: cityCollections
    });

  } catch (err) {
    res.status(500).json({message: err.message, statuscode : 500})
  }
};

export const getBycityAndBloodGroup = async(req,res)=>{
    const {city, bloodGroup} = req.body
    try{
        if(!city || !bloodGroup){
            return res.status(400).json({message: "Please Enter all fields", statuscode: 400});
        }
        const collection_data = getDonorModel(city)
        if(!collection_data){
            return res.status(400).json({message: "Blood not available on this city", statuscode: 404});
        }
        const available_data =  await collection_data.find({bloodGroup});

        if(!available_data){
            return res.status(404).json({message: "Data not available for this blood group", statuscode: 404});
        }

        res.status(200).json({
            success: true,
            bloodGroup:bloodGroup,
            count: available_data.length,
            data: available_data
          });
    }catch(err){
        res.status(500).json({message: err.message, statuscode : 500})
    }
}
