const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (to, subject, text) => {
  try {
    // Create the transporter using SMTP and the credentials from .env
    const transporter = nodemailer.createTransport({
      service: "gmail",  // You can change this depending on your SMTP service
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT == 465,  // If using SSL (port 465)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Email options
    const mailOptions = {
      from: process.env.FROM_EMAIL,  // sender address
      to: to,                        // receiver address
      subject: subject,              // subject line
      text: text                     // OTP message content
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully to:", to);
  } catch (error) {
    console.error("Failed to send OTP:", error);
    throw new Error("Failed to send OTP");
  }
};

module.exports = sendEmail;
