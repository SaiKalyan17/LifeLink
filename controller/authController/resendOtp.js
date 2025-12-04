import sendResendOtpMail from "../../config/emailService.js";
import Auth from "../../model/authModel.js";
export const resendOtp = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await Auth.findOne({ email });
  
      if (!user) return res.status(404).json({ message: "User not found" });
      if (user.isVerified) return res.status(400).json({ message: "Already verified" });
  
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
      user.otp = otp;
      user.otpExpiry = Date.now() + 10 * 60 * 1000;
      await user.save();
      await sendResendOtpMail(email, otp);
  
      res.json({ message: "OTP resent successfully" });
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  