import sendEmailOtp from "../../config/emailService.js";
import Auth from "../../model/authModel.js";
import bcrypt from "bcrypt";
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
    
        const user = await Auth.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found" });
    
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000;
    
        await user.save();
    
        await sendEmailOtp(email, otp,user.userName);
    
        res.status(200).json({ msg: "Password reset OTP sent" });
      } catch (err) {
        res.status(500).json({ msg: "Server error" });
      }
};


export const resetPassword = async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body;
  
      const user = await Auth.findOne({ email });
      if (!user){
        return res.status(400).json({ msg: "User not found" });
    }
      if (user.otp !== otp) {
        return res.status(400).json({ msg: "Invalid OTP" });
    }
      if (user.otpExpires < Date.now()){
        return res.status(400).json({ msg: "OTP expired" });
      }
  
      user.password = await bcrypt.hash(newPassword, 10);
      user.otp = null;
      user.otpExpires = null;
  
      await user.save();
  
      res.status(200).json({ msg: "Password reset successful" });
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  };
  