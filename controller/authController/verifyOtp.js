import Auth from "../../model/authModel.js";
export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      const user = await Auth.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (user.isVerified) {
        return res.status(400).json({ message: "Already verified" });
      }
  
      if (user.otp !== otp || user.otpExpiry < Date.now()) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }
  
      user.isVerified = true;
      user.otp = undefined;
      user.otpExpiry = undefined;
  
      await user.save();
  
      res.status(200).json({
        message: "Email verified successfully"
      });
  
    } catch (err) {
      res.status(500).json({
        message: err.message || err
      });
    }
  };
  