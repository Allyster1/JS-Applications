import { api } from "./request.js";

export async function getAllProducts() {
  return api.get("/data/fruits?sortBy=_createdOn%20desc");
}

export async function getProductById(productId) {
  return api.get("/data/fruits/" + productId);
}

export async function createProduct(name, imageUrl, description, nutrition) {
  return api.post("/data/fruits", { name, imageUrl, description, nutrition });
}

export async function updateProduct(productId, productData) {
  return api.put("/data/fruits/" + productId, productData);
}
