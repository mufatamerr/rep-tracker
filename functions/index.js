const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "mjtamer@outlook.com",
    pass: "YOUR_APP_PASSWORD",
  },
});

exports.sendOtp = functions.https.onCall(async (data, context) => {
  const {email, otp} = data; // ✅ Removed extra spaces

  const mailOptions = {
    from: "mjtamer@outlook.com",
    to: email,
    subject: "Your Verification OTP",
    text: `Your OTP is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {success: true};
  } catch (error) {
    return {error: error.message};
  }
});
