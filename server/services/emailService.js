import transporter from "../config/mail.js";

// ==========================================
// Send Verification OTP Email
// ==========================================
export const sendVerificationEmail = async (email, name, otp) => {
  try {
    await transporter.sendMail({
      from: `"HR Analytics Platform" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Email Verification OTP - HR Analytics Platform",

      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;max-width:600px;margin:auto;">

          <h2 style="color:#0d6efd;">
            Welcome to HR Analytics Platform
          </h2>

          <p>Hello <strong>${name}</strong>,</p>

          <p>
            Thank you for registering.
          </p>

          <p>
            Please use the following One-Time Password (OTP) to verify your email address.
          </p>

          <div
            style="
              background:#f4f4f4;
              padding:20px;
              text-align:center;
              border-radius:8px;
              margin:20px 0;
            "
          >
            <h1
              style="
                margin:0;
                color:#0d6efd;
                letter-spacing:8px;
              "
            >
              ${otp}
            </h1>
          </div>

          <p>
            This OTP is valid for <strong>10 minutes</strong>.
          </p>

          <p>
            Please do not share this OTP with anyone.
          </p>

          <hr>

          <small style="color:gray;">
            If you did not create this account, you can safely ignore this email.
          </small>

        </div>
      `,
    });

    console.log("✅ Verification OTP email sent.");
  } catch (error) {
    console.log("Email Error:", error.message);
    throw error;
  }
};

// ==========================================
// Send Password Reset OTP Email
// ==========================================
export const sendResetPasswordEmail = async (email, name, otp) => {
  try {
    await transporter.sendMail({
      from: `"HR Analytics Platform" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset OTP - HR Analytics Platform",

      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;max-width:600px;margin:auto;">

          <h2 style="color:#dc3545;">
            Password Reset Request
          </h2>

          <p>Hello <strong>${name}</strong>,</p>

          <p>
            We received a request to reset your password.
          </p>

          <p>
            Use the OTP below to continue.
          </p>

          <div
            style="
              background:#f4f4f4;
              padding:20px;
              text-align:center;
              border-radius:8px;
              margin:20px 0;
            "
          >
            <h1
              style="
                margin:0;
                color:#dc3545;
                letter-spacing:8px;
              "
            >
              ${otp}
            </h1>
          </div>

          <p>
            This OTP is valid for <strong>10 minutes</strong>.
          </p>

          <p>
            If you didn't request a password reset, please ignore this email.
          </p>

          <hr>

          <small style="color:gray;">
            Never share this OTP with anyone.
          </small>

        </div>
      `,
    });

    console.log("✅ Password Reset OTP email sent.");
  } catch (error) {
    console.log("Email Error:", error.message);
    throw error;
  }
};
