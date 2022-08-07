import http from "./index";

export const login = async (params) => {
  const response = await http.post("/auth/login", params);
  return response.data;
};

export const logout = async () => {
  const response = await http.post("/auth/logout");
  return response.data;
};

export const register = async ({ email, password }) => {
  const response = await http.post("/auth/register", { email, password });
  return response.data;
};

export const fetchPasswordResetLink = async ({ email }) => {
  const response = await http.post("/password/forgot", {
    email,
    reset_url: window.location.href,
  });
  return response.data;
};

export const resetPassword = async ({
  newPassword,
  passwordConfirmation,
  resetToken,
}) => {
  const response = await http.post("/password/reset", {
    password: newPassword,
    password_confirmation: passwordConfirmation,
    token: resetToken,
  });
  return response.data;
};
