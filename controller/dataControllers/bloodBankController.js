import { capitalize } from "../../config/Captalize.js";
import BloodBanks from "../../model/bloodBankModel.js";

export const getBanksByCity = async(req,res)=>{
    const {City} = req.params
    try{
        if(!City){
            return res.status(400).json({ message: "Please enter all fields", statuscode: 400});
        }
        
        const blodbanks = await BloodBanks.find({City:capitalize(City)})

        if (blodbanks.length === 0) {
            return res.status(404).json({ success: false, message: `No Banks found for city: ${City}`});
          }
          res.status(200).json({
            success: true,
            count: blodbanks.length,
            data: blodbanks
          });
    }catch (err) {
        res.status(500).json({ message: err.message });
      }
}

