import { api } from "./request.js";

const endpoints = {
  all: "/data/products?sortBy=_createdOn%20desc",
  create: "/data/products",
  byId: "/data/products/",
  bought: "/data/bought",
};

async function getAllProducts() {
  return api.get(endpoints.all);
}

async function getProductById(id) {
  return api.get(endpoints.byId + id);
}

async function createProduct(name, imageUrl, category, description, price) {
  return api.post(endpoints.create, {
    name,
    imageUrl,
    category,
    description,
    price,
  });
}

async function deleteProduct(id) {
  return api.del(endpoints.byId + id);
}

async function updateProduct(
  id,
  { name, imageUrl, category, description, price }
) {
  return api.put(endpoints.byId + id, {
    name,
    imageUrl,
    category,
    description,
    price,
  });
}

async function buyProduct(id) {
  return api.post(endpoints.bought, { productId: id });
}

async function getTotalBought(productId) {
  return api.get(
    endpoints.bought +
      `?where=productId%3D%22${productId}%22&distinct=_ownerId&count`
  );
}

async function userTotalBought(productId, userId) {
  return api.get(
    endpoints.bought +
      `?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}

export const dataServices = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  buyProduct,
  getTotalBought,
  userTotalBought,
};
