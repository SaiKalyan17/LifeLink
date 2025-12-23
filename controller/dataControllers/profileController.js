import jwt from "jsonwebtoken";
import Auth from "../../model/authModel.js";

export const getProfileData = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({message: "Token is required",statuscode: 400,});
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const userData = await Auth.findById(userId).select("-password -otp -otpExpiry");
    if (!userData) {
      return res.status(404).json({
        message: "User not found",
        statuscode: 404,
      });
    }

    return res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
      statuscode: 500,
    });
  }
};

export const getProfileName = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({message: "Token is required",statuscode: 400,});
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const userData = await Auth.findById(userId).select("-password -otp -otpExpiry");
    if (!userData) {
      return res.status(404).json({
        message: "User not found",
        statuscode: 404,
      });
    }

    return res.status(200).json({
      success: true,
      data: userData.userName,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal Server Error",
      statuscode: 500,
    });
  }
};

