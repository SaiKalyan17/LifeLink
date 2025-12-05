// import dotenv from "dotenv";
// import nodemailer from "nodemailer";

// dotenv.config();

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     port: 2525,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   });
  
//   await transporter.verify();
//   console.log("Email server ready");

// const sendEmailOtp = async (email, otp, userName) => {
//   try {
//     await transporter.sendMail({
//       from: `"Verification" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Your OTP for Verification",
//       html: `
//         <h3>Hello ${userName}, Welcome to PulseConnect</h3>
//         <p>Your OTP is:</p>
//         <h2>${otp}</h2>
//         <p>This OTP will expire in 10 minutes.</p>
//       `
//     });

//     console.log("OTP email sent successfully");
//   } catch (error) {
//     console.error("Email sending failed:", error.message);
//     throw new Error("Email not sent");
//   }
// };

// export const sendResendOtpMail = async (email, otp) => {
//     try {
//       await transporter.sendMail({
//         from: `"Verification" <${process.env.EMAIL_USER}>`,
//         to: email,
//         subject: "Resend OTP",
//         html: `<h2>Your new OTP is ${otp}</h2>`
//       });
  
//       console.log("Resend OTP email sent");
//     } catch (error) {
//       console.error("Resend OTP failed:", error.message);
//       throw new Error("Resend failed");
//     }
//   };


import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmailOtp = async (email, otp, userName) => {
  try {
    await transporter.sendMail({
      from: `"Verification" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP for Verification",
      html: `
        <h3>Hello ${userName}, Welcome to PulseConnect</h3>
        <p>Your OTP is:</p>
        <h2>${otp}</h2>
        <p>This OTP will expire in 10 minutes.</p>
      `
    });

    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Email sending failed:", error.message);
    throw new Error("Email not sent");
  }
};

export const sendResendOtpMail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: `"Verification" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Resend OTP",
      html: `<h2>Your new OTP is ${otp}</h2>`
    });

    console.log("Resend OTP email sent");
  } catch (error) {
    console.error("Resend OTP failed:", error.message);
    throw new Error("Resend failed");
  }
};

export default sendEmailOtp;


// export default sendEmailOtp;

