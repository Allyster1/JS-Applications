import { api } from "./request.js";

export async function login(email, password) {
  return api.post("/users/login", { email, password });
}

export async function register(email, password) {
  return api.post("/users/register", { email, password });
}

export async function logout() {
  return api.get("/users/logout");
}
