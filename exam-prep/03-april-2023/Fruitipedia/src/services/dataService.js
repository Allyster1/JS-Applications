import { api } from "./request.js";

const endpoints = {
  all: "/data/fruits?sortBy=_createdOn%20desc",
  byId: "/data/fruits/",
  create: "/data/fruits",
  search: (query) => `/data/fruits?where=name%20LIKE%20%22${query}%22`,
};

async function getAllProducts() {
  return api.get(endpoints.all);
}

async function getProductById(id) {
  return api.get(endpoints.byId + id);
}

async function createProduct(name, imageUrl, description, nutrition) {
  return api.post(endpoints.create, {
    name,
    imageUrl,
    description,
    nutrition,
  });
}

async function updateProduct(id, { name, imageUrl, description, nutrition }) {
  return api.put(endpoints.byId + id, {
    name,
    imageUrl,
    description,
    nutrition,
  });
}

async function deleteProduct(id) {
  return api.del(endpoints.byId + id);
}

async function searchProduct(query) {
  return api.get(endpoints.search(query));
}

export const dataServices = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};
