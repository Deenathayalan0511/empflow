import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { forgotPassword } from "../services/authService";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await forgotPassword(email);

      toast.success(res.message,{
  closeButton: true,
  autoClose: 3000,
});

      // Save email for next step
      localStorage.setItem("resetEmail", email);

      setTimeout(() => {
        navigate("/verify-reset-otp");
      }, 1000);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong.",{
  closeButton: true,
  autoClose: 3000,
}
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
              className="bi bi-key-fill text-primary"
              style={{ fontSize: "55px" }}
            ></i>

            <h2 className="fw-bold mt-3">
              Forgot Password
            </h2>

            <p className="text-muted">
              Enter your registered email address.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label>Email Address</label>

              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>

            <button
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Sending OTP...
                </>
              ) : (
                <>
                  <i className="bi bi-envelope-fill me-2"></i>
                  Send OTP
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

export default ForgotPassword;