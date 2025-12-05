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

// export default sendEmailOtp;


import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

// ------------------ MAILGUN SMTP TRANSPORTER ------------------
const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 2525,                 // Railway allows ONLY port 2525
  secure: false,
  auth: {
    user: process.env.MAILGUN_USER, // Example: postmaster@sandboxXXXX.mailgun.org
    pass: process.env.MAILGUN_PASS, // SMTP password from Mailgun
  },
});

// Verify transporter on server start
transporter.verify((error, success) => {
  if (error) {
    console.error("Mailgun SMTP Connection Error:", error);
  } else {
    console.log("Mailgun SMTP Server is Ready ✔");
  }
});

// ------------------ SEND OTP MAIL ------------------
const sendEmailOtp = async (email, otp, userName) => {
  try {
    await transporter.sendMail({
      from: `"PulseConnect Verification" <${process.env.MAILGUN_USER}>`,
      to: email,
      subject: "Your OTP for Verification",
      html: `
        <h3>Hello ${userName}, Welcome to PulseConnect!</h3>
        <p>Your OTP is:</p>
        <h2>${otp}</h2>
        <p>This OTP will expire in 10 minutes.</p>
      `,
    });

    console.log("OTP email sent successfully ✔");
  } catch (error) {
    console.error("OTP Email sending failed:", error.message);
    throw new Error("Email not sent");
  }
};

// ------------------ RESEND OTP MAIL ------------------
export const sendResendOtpMail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: `"PulseConnect Verification" <${process.env.MAILGUN_USER}>`,
      to: email,
      subject: "Resend OTP",
      html: `<h2>Your new OTP is: ${otp}</h2>`,
    });

    console.log("Resend OTP email sent ✔");
  } catch (error) {
    console.error("Resend OTP failed:", error.message);
    throw new Error("Resend failed");
  }
};

export default sendEmailOtp;
