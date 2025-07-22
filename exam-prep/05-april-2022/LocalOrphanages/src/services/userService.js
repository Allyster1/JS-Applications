import { api } from "./request.js";
import { clearUserData, saveUserData, updateNav } from "./userUtility.js";

const endpoint = {
  login: "/users/login",
  register: "/users/register",
  logout: "/users/logout",
};

async function login(email, password) {
  const result = await api.post(endpoint.login, { email, password });
  saveUserData(result);
  updateNav();
  return result;
}

async function register(email, password) {
  const result = await api.post(endpoint.register, { email, password });
  saveUserData(result);
  updateNav();
  return result;
}

async function logout() {
  const result = await api.get(endpoint.logout);
  clearUserData();
  updateNav();
  return result;
}

export const userService = { login, register, logout };
