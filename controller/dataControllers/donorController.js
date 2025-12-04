import { getDonorModel } from "../../model/donorModel.js";


export const getDonorsByCity = async (req,res)=>{
    try {
        const { city } = req.params;

        if(!city){
            return res.status(400).json({ message: "Please enter all fields", statuscode: 400});
        }
        const Donor = getDonorModel(city);
        const donors = await Donor.find();

        if (donors.length === 0) {
            return res.status(404).json({ success: false, message: `No donors found for city: ${city}`});
          }
    
          res.status(200).json({
            success: true,
            count: donors.length,
            data: donors
          });
      
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

export const createDonor = async(req,res)=>{
    const {name,bloodGroup,mobileNumber,city,address,email,dob} = req.body
    try{
        if(!name || !bloodGroup || !mobileNumber || !city || !address || !email || !dob){
            res.status(400).json({message:"Please fill all details" , statuscode : 400})
        }
        const city_collection = getDonorModel(city)

        const created_data = await city_collection.create({name,bloodGroup,mobileNumber,city,address,email,dob})

        res.status(201).json({ message :"Data created Successfully",
            success : true,
            data : created_data,
            statuscode : 201
        })
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}