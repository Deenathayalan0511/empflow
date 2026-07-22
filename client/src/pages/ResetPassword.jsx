import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { resetPassword } from "../services/authService";

function ResetPassword() {
  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");
  const otp = localStorage.getItem("resetOTP");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    if (password.length < 6) {
      return toast.error(
        "Password must be at least 6 characters."
      );
    }

    try {
      setLoading(true);

      const res = await resetPassword(
        email,
        otp,
        password
      );

      toast.success(res.message);

      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetOTP");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to reset password."
      );
    } finally {
      setLoading(false);
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

            <h2 className="mt-3">
              Create New Password
            </h2>

            <p className="text-muted">
              Enter your new password.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label>New Password</label>

              <input
                type="password"
                className="form-control"
                placeholder="Enter new password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

            </div>

            <div className="mb-4">

              <label>Confirm Password</label>

              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                required
              />

            </div>

            <button
              className="btn btn-success w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Updating...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Update Password
                </>
              )}
            </button>

          </form>

          <div className="text-center mt-4">
            <Link to="/login">
              Back to Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ResetPassword;