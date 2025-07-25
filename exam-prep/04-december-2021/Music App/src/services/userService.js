import { api } from "./request.js";
import { saveUserData, clearUserData, updateNav } from "./userUtility.js";

const endpoints = {
  login: "/users/login",
  register: "/users/register",
  logout: "/users/logout",
};

async function login(email, password) {
  const response = await api.post(endpoints.login, { email, password });
  saveUserData(response);
  updateNav();
}

async function register(email, password) {
  const response = await api.post(endpoints.register, { email, password });
  saveUserData(response);
  updateNav();
}

async function logout() {
  await api.get(endpoints.logout);
  clearUserData();
  updateNav();
}

export const userServices = { login, register, logout };
