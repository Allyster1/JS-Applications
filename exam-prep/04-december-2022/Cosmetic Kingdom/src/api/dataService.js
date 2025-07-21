import { api } from "./request.js";

export async function getAllProducts() {
  return api.get("/data/products?sortBy=_createdOn%20desc");
}

export async function getProductById(productId) {
  return api.get("/data/products/" + productId);
}

export async function createProduct(
  name,
  imageUrl,
  category,
  description,
  price
) {
  return api.post("/data/products", {
    name,
    imageUrl,
    category,
    description,
    price,
  });
}

export async function deleteProduct(productId) {
  return api.del("/data/products/" + productId);
}

// export async function updateProduct(productId, productData) {
//   return api.put("/data/fruits/" + productId, productData);
// }

// export async function searchProduct(query) {
//   return api.get(`/data/fruits?where=name%20LIKE%20%22${query}%22`);
// }
