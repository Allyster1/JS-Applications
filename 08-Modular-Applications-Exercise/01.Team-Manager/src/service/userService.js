import { userUtility } from "../utility/userUtility.js";
import { api } from "./requester.js";

const endpoints = {
  login: "http://localhost:3030/users/login",
  register: "http://localhost:3030/users/register",
  logout: "http://localhost:3030/users/logout",
};

async function login(data) {
  const userData = await api.post(endpoints.login, data);
  userUtility.setUserData(userData);
}

async function register(data) {
  const userData = await api.post(endpoints.register, data);
}

async function logout() {
  await api.get(endpoints.logout);
  userUtility.clearUserData();
}

export const userService = {
  login,
  register,
  logout,
};
