import { api } from "./request.js";
import { clearUserData, updateNav, saveUserData } from "./userUtility.js";

const endpoints = {
  login: "/users/login",
  register: "/users/register",
  logout: "/users/logout",
};

async function login(email, password) {
  const result = await api.post(endpoints.login, { email, password });
  saveUserData(result);
  updateNav();
  return result;
}

async function register(email, password) {
  const result = await api.post(endpoints.register, { email, password });
  saveUserData(result);
  updateNav();
  return result;
}

async function logout() {
  await api.get(endpoints.logout);
  clearUserData();
  updateNav();
  return;
}

export const userServices = {
  login,
  register,
  logout,
};
