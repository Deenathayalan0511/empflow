import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify SMTP Connection
transporter.verify((error) => {
  if (error) {
    console.log("❌ Email Configuration Error:", error.message);
  } else {
    console.log("✅ Email Server Connected");
  }
});

export default transporter;