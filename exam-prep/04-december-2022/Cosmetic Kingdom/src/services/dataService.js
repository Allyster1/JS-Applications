import { api } from "./request.js";

const endpoints = {
  all: "/data/products?sortBy=_createdOn%20desc",
  create: "/data/products",
  byId: "/data/products/",
  bought: "/data/bought",
};

export async function getAllProducts() {
  return api.get(endpoints.all);
}

export async function getProductById(id) {
  return api.get(endpoints.byId + id);
}

export async function createProduct(
  name,
  imageUrl,
  category,
  description,
  price
) {
  return api.post(endpoints.create, {
    name,
    imageUrl,
    category,
    description,
    price,
  });
}

export async function deleteProduct(id) {
  return api.del(endpoints.byId + id);
}
