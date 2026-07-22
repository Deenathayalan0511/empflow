import express from "express";

import {
  register,
  login,
  logout,
  refreshAccessToken,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

// ==========================================
// Authentication
// ==========================================
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logout);

// ==========================================
// Email Verification
// ==========================================
router.post("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);

// ==========================================
// Password Reset
// ==========================================
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOTP);
router.post("/reset-password", resetPassword);

export default router;
