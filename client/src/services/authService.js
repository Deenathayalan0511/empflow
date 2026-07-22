import api from "./api";

// ==========================================
// REGISTER
// ==========================================
export const register = async (userData) => {
  const { data } = await api.post("/auth/register", userData);
  return data;
};

// ==========================================
// LOGIN
// ==========================================
export const login = async (userData) => {
  const { data } = await api.post("/auth/login", userData);

  localStorage.setItem("token", data.accessToken);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
};

// ==========================================
// LOGOUT
// ==========================================
export const logout = async () => {
  await api.post("/auth/logout");

  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// ==========================================
// REFRESH ACCESS TOKEN
// ==========================================
export const refreshAccessToken = async () => {
  const { data } = await api.post("/auth/refresh");
  return data;
};

// ==========================================
// VERIFY EMAIL OTP
// ==========================================
export const verifyEmail = async (email, otp) => {
  const { data } = await api.post("/auth/verify-email", {
    email,
    otp,
  });

  return data;
};

// ==========================================
// RESEND VERIFICATION OTP
// ==========================================
export const resendVerification = async (email) => {
  const { data } = await api.post("/auth/resend-verification", {
    email,
  });

  return data;
};

// ==========================================
// FORGOT PASSWORD
// ==========================================
export const forgotPassword = async (email) => {
  const { data } = await api.post("/auth/forgot-password", {
    email,
  });

  return data;
};

// ==========================================
// VERIFY RESET OTP
// ==========================================
export const verifyResetOTP = async (email, otp) => {
  const { data } = await api.post("/auth/verify-reset-otp", {
    email,
    otp,
  });

  return data;
};

// ==========================================
// RESET PASSWORD
// ==========================================
export const resetPassword = async (email, otp, password) => {
  const { data } = await api.post("/auth/reset-password", {
    email,
    otp,
    password,
  });

  return data;
};