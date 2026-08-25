import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { verifyResetOTP, forgotPassword } from "../services/authService";

function VerifyResetOTP() {
  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await verifyResetOTP(email, otp);

      toast.success(res.message, {
        closeButton: true,
        autoClose: 3000,
      });

      // Save OTP for Reset Password page
      localStorage.setItem("resetOTP", otp);

      setTimeout(() => {
        navigate("/reset-password");
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP", {
        closeButton: true,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const res = await forgotPassword(email);

      toast.success(res.message, {
        closeButton: true,
        autoClose: 3000,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to resend OTP.", {
        closeButton: true,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 450 }}>
      <div className="card shadow">
        <div className="card-body">
          <div className="text-center mb-4">
            <i
              className="bi bi-shield-lock-fill text-success"
              style={{ fontSize: "60px" }}
            ></i>

            <h2 className="mt-3">Verify OTP</h2>

            <p className="text-muted">Enter the OTP sent to</p>

            <strong>{email}</strong>
          </div>

          <form onSubmit={handleVerify}>
            <div className="mb-3">
              <label>OTP</label>

              <input
                type="text"
                className="form-control text-center fs-3"
                placeholder="Enter 6 Digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
              />
            </div>

            <button className="btn btn-success w-100" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary w-100 mt-3"
              onClick={handleResend}
            >
              Resend OTP
            </button>
          </form>

          <div className="text-center mt-4">
            <Link to="/login">Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyResetOTP;
