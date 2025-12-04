import bcrypt from "bcrypt";
import sendEmailOtp from '../../config/emailService.js';
import Auth from "../../model/authModel.js";
const registerUser = async (req, res) => {
  const { userName, mobileNumber, password, email } = req.body;

  try {
    if (!userName || !mobileNumber || !password || !email) {
      return res.status(400).json({
        message: "Please enter all fields",
        statuscode: 400
      });
    }

    const availableUser = await Auth.findOne({$or: [{ mobileNumber }, { email }]});

    if (availableUser) {
      return res.status(400).json({ message: "User already exists. Please login.",statuscode: 400 });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const registeruser = await Auth.create({
      userName,
      mobileNumber,
      email,
      password: encryptedPassword,
      otp,
      otpExpiry: Date.now() + 10 * 60 * 1000 
    });
    await sendEmailOtp(email,otp,userName);

    res.status(201).json({message: "User registered. OTP sent to email for verification."});

  } catch (err) {
    res.status(500).json({ message: err.message || err, statuscode: 500 });
  }
};

export default registerUser;
