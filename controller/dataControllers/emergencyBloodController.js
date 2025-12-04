import Emergencyblood from "../../model/emergencyBloodModel.js"

export const createEmergencyBlood = async(req,res)=>{
    const {name,bloodGroup,mobileNumber,city,address,email,packets} = req.body

    try{
        if( !name|| !bloodGroup|| !mobileNumber|| !city || !address|| !email|| !packets){
            res.status(400).json({message:"Please enter all details", statuscode : 400})
        }
        const createdData = await Emergencyblood.create({name,bloodGroup,mobileNumber,city,address,email,packets})

        res.status(201).json({ message :"Data created Successfully",
            success : true,
            data : createdData,
            statuscode : 201
        })

    }catch(err){
        res.status(500).json({message: "Internal server issue" + err.message, statuscode: 500})
    }
}

export const getEmergencyBlood = async(req,res) =>{
    const {city} = req.params
    try{
        if(!city){
            return res.status(400).json({message: "Please Enter required fields", statuscode: 400});
        }
        const bloodData = await Emergencyblood.find({city: { $regex: new RegExp(`^${city}$`, "i")}});
        if(bloodData.length == 0){
            return res.status(404).json({message: "Emergency Blood not available on this city", statuscode: 404});
        }
        res.status(200).json({
            success: true,
            count: bloodData.length,
            data: bloodData
          });
    }catch(err){
        res.status(500).json({message: err.message, statuscode : 500})
    }
}