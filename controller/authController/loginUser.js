import bcrypt from "bcrypt";
import authToken from "../../config/authToken.js";
import Auth from "../../model/authModel.js";
const loginUser = async (req, res) => {
    const { mobileNumber, password } = req.body;

    try {
        if (!mobileNumber || !password) {
            return res.status(400).json({ message: "Please enter all fields", statuscode: 400 });
        }

        const user = await Auth.findOne({ mobileNumber });
        if (!user) {
            return res.status(401).json({message: "Invalid credentials", statuscode: 401 });
        }
        if(!user.isVerified){
            return res.status(403).json({message: "Email not verified. Please verify your email to continue.", statuscode: 403 });
        }
    
        const pwdMatch = await bcrypt.compare(password, user.password);
        if (!pwdMatch) {
            return res.status(401).json({ message: "Invalid credentials", statuscode: 401 });
        }
        const generateToken = authToken(user._id)
        return res.status(200).json({message: "Login successful", statuscode: 200,
            data: {
                id: user._id,
                userName: user.userName,
                mobileNumber: user.mobileNumber,
                token : generateToken
            }
        });

    } catch (err) {
        return res.status(500).json({ message: err.message || "Internal Server Error",statuscode: 500});
    }
};

export default loginUser;
