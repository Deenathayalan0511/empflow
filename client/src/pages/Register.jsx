import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  register,
  verifyEmail,
  resendVerification,
} from "../services/authService";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [showOTP, setShowOTP] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      console.log(res);

      toast.success(res.message);
      setShowOTP(true);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      console.log(err.response?.data);

      toast.error(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };
  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await verifyEmail(form.email, otp);

      toast.success(res.message);

      localStorage.removeItem("verifyEmail");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };
  const handleResendOTP = async () => {
    try {
      const res = await resendVerification(form.email);

      toast.success(res.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to resend OTP.");
    }
  };
  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow">
        <div className="card-body p-4">
          {!showOTP ? (
            <>
              <h2 className="text-center mb-4">Register</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button className="btn btn-success w-100" disabled={loading}>
                  {loading ? "Creating Account..." : "Register"}
                </button>
              </form>

              <div className="alert alert-info mt-4">
                <i className="bi bi-shield-lock-fill me-2"></i>
                After registration, a 6-digit OTP will be sent to your email.
              </div>

              <p className="text-center mt-3">
                Already have an account?
                <Link to="/login"> Login</Link>
              </p>
            </>
          ) : (
            <>
              <div className="text-center">
                <i
                  className="bi bi-envelope-check-fill text-success"
                  style={{ fontSize: "60px" }}
                ></i>

                <h2 className="mt-3">Verify Email</h2>

                <p className="text-muted">Enter the OTP sent to</p>

                <strong>{form.email}</strong>
              </div>

              <form onSubmit={handleVerifyOTP} className="mt-4">
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

                <button className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary w-100 mt-3"
                  onClick={handleResendOTP}
                >
                  Resend OTP
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
