import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";

import generateOTP from "../utils/generateOTP.js";

import {
  sendVerificationEmail,
  sendResetPasswordEmail,
} from "../services/emailService.js";

// ==========================================
// REGISTER
// ==========================================
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check Existing Email
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = generateOTP();

    // OTP Expiry (10 Minutes)
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    // Save User
    await db.query(
      `
      INSERT INTO users
      (
        name,
        email,
        password,
        is_verified,
        email_otp,
        email_otp_expires
      )
      VALUES (?,?,?,?,?,?)
      `,
      [name, email, hashedPassword, false, otp, otpExpiry],
    );

    // Send OTP Email
    await sendVerificationEmail(email, name, otp);

    return res.status(201).json({
      success: true,
      message: "Registration successful. OTP has been sent to your email.",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// LOGIN
// ==========================================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // Find User
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = users[0];

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ===========================
    // Email Verification Check
    // ===========================
    if (!user.is_verified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    // Generate Tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // Save Refresh Token
    await db.query(
      `
      INSERT INTO refresh_tokens
      (user_id, token, expires_at)
      VALUES (?, ?, ?)
      `,
      [user.id, refreshToken, expiresAt],
    );

    // Send Cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// VERIFY EMAIL OTP
// ==========================================
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    // Find User
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const user = users[0];

    // Already Verified
    if (user.is_verified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified.",
      });
    }

    // OTP Check
    if (user.email_otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    // OTP Expiry Check
    if (new Date(user.email_otp_expires) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    // Verify User
    await db.query(
      `
      UPDATE users
      SET
        is_verified = ?,
        email_otp = NULL,
        email_otp_expires = NULL
      WHERE id = ?
      `,
      [true, user.id],
    );

    return res.status(200).json({
      success: true,
      message: "Email verified successfully. You can now login.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// RESEND VERIFICATION OTP
// ==========================================
export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const user = users[0];

    if (user.is_verified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified.",
      });
    }

    // Generate New OTP
    const otp = generateOTP();

    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    // Save OTP
    await db.query(
      `
      UPDATE users
      SET
        email_otp = ?,
        email_otp_expires = ?
      WHERE id = ?
      `,
      [otp, otpExpiry, user.id],
    );

    // Send OTP
    await sendVerificationEmail(user.email, user.name, otp);

    return res.status(200).json({
      success: true,
      message: "Verification OTP sent successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// FORGOT PASSWORD
// ==========================================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    // Find User
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email.",
      });
    }

    const user = users[0];

    // Generate OTP
    const otp = generateOTP();

    // OTP Expiry (10 Minutes)
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    // Save OTP
    await db.query(
      `
      UPDATE users
      SET
        reset_otp = ?,
        reset_otp_expires = ?
      WHERE id = ?
      `,
      [otp, otpExpiry, user.id],
    );

    // Send OTP Email
    await sendResetPasswordEmail(user.email, user.name, otp);

    return res.status(200).json({
      success: true,
      message: "Password reset OTP has been sent to your email.",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==========================================
// VERIFY RESET OTP
// ==========================================
export const verifyResetOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const user = users[0];

    // OTP Check
    if (user.reset_otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    // Expiry Check
    if (new Date(user.reset_otp_expires) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==========================================
// RESET PASSWORD
// ==========================================
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP and password are required.",
      });
    }

    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const user = users[0];

    // OTP Check
    if (user.reset_otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    // Expiry Check
    if (new Date(user.reset_otp_expires) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update Password
    await db.query(
      `
      UPDATE users
      SET
        password = ?,
        reset_otp = NULL,
        reset_otp_expires = NULL
      WHERE id = ?
      `,
      [hashedPassword, user.id],
    );

    return res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// REFRESH ACCESS TOKEN
// ==========================================
export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const [tokens] = await db.query(
      "SELECT * FROM refresh_tokens WHERE token = ?",
      [refreshToken],
    );

    if (tokens.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const [users] = await db.query("SELECT * FROM users WHERE id = ?", [
      decoded.userId,
    ]);

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = users[0];

    const accessToken = generateAccessToken(user);

    return res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Refresh token expired",
    });
  }
};

// ==========================================
// LOGOUT
// ==========================================
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(200).json({
        success: true,
        message: "Already logged out",
      });
    }

    await db.query("DELETE FROM refresh_tokens WHERE token = ?", [
      refreshToken,
    ]);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout Successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
