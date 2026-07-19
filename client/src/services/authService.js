import api from "./api";

export const register = async (userData) => {
  const { data } = await api.post("/auth/register", userData);
  return data;
};

export const login = async (userData) => {
  const { data } = await api.post("/auth/login", userData);

  localStorage.setItem("token", data.accessToken);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
};

export const logout = async () => {
  await api.post("/auth/logout");

  localStorage.removeItem("token");
  localStorage.removeItem("user");
};