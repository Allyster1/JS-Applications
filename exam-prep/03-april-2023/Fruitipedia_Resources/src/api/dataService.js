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

export async function deleteProduct(productId) {
  return api.del("/data/fruits/" + productId);
}

export async function updateProduct(productId, productData) {
  return api.put("/data/fruits/" + productId, productData);
}

export async function searchProduct(query) {
  return api.get(`/data/fruits?where=name%20LIKE%20%22${query}%22`);
}
