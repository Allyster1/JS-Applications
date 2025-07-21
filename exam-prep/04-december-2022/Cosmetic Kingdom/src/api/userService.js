import { clearUserData } from "./userUtility.js";
import { api } from "./request.js";

function extractValidator(formData, ...fields) {
  const result = {};
  for (const field of fields) {
    const value = formData.get(field)?.trim() || "";
    if (!value) {
      throw new Error("All fields are required!");
    }
    result[field] = value;
  }
  return result;
}

function login(formData) {
  const { email, password } = extractValidator(formData, "email", "password");

  return api.post("/users/login", { email, password });
}

function register(formData) {
  const {
    email,
    password,
    ["re-password"]: rePass,
  } = extractValidator(formData, "email", "password", "re-password");

  if (password !== rePass) {
    throw new Error("Passwords don't match");
  }

  return api.post("/users/register", { email, password });
}

async function logout() {
  await api.get("/users/logout");
  clearUserData();
}

export const userService = { login, register, logout };
