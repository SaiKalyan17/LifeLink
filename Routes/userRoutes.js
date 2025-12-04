import express from "express";
import { forgotPassword, resetPassword } from "../controller/authController/forgotPassword.js";
import loginUser from "../controller/authController/loginUser.js";
import registerUser from "../controller/authController/registerUser.js";
import { resendOtp } from "../controller/authController/resendOtp.js";
import { verifyOtp } from "../controller/authController/verifyOtp.js";
import { getBanksByCity } from "../controller/dataControllers/bloodBankController.js";
import { createDonor, getDonorsByCity } from "../controller/dataControllers/donorController.js";
import { createEmergencyBlood, getEmergencyBlood } from "../controller/dataControllers/emergencyBloodController.js";
import { getProfileData } from "../controller/dataControllers/profileController.js";
import { getBycityAndBloodGroup, getOnlyCities } from "../controller/dataControllers/searchController.js";

const router = express.Router()

// Authentication Routes
router.route("/register").post(registerUser)

router.route("/verify-otp").post(verifyOtp)

router.route("/resend-otp").post(resendOtp)

router.route("/login").post(loginUser)

router.route("/login").post(loginUser)

// Donors data Routes
router.route("/get-donors/:city").get(getDonorsByCity)
router.route("/create-donor").post(createDonor)
router.route("/get-cities").get(getOnlyCities)
router.route("/get-by-bloodgroup").get(getBycityAndBloodGroup)

// Blood Banks

router.route("/blood-bank/:City").get(getBanksByCity)

router.route("/emergency-blood").post(createEmergencyBlood)

router.route("/get-emergency-blood/:city").get(getEmergencyBlood)

router.route("/forgot-password").post(forgotPassword)



router.route("/reset-password").post(resetPassword);

router.route("/profile").get(getProfileData)

export default router;