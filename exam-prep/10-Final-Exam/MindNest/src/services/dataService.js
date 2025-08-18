import { api } from "./request.js";

const endpoints = {
  all: "/data/mindfultips?sortBy=_createdOn%20desc",
  byId: "/data/mindfultips/",
  create: "/data/mindfultips",
};

async function getAllProducts() {
  return api.get(endpoints.all);
}

async function getProductById(id) {
  return api.get(endpoints.byId + id);
}

async function createProduct(title, imageUrl, type, difficulty, description) {
  return api.post(endpoints.create, {
    title,
    imageUrl,
    type,
    difficulty,
    description,
  });
}

async function updateProduct(
  id,
  { title, imageUrl, type, difficulty, description }
) {
  return api.put(endpoints.byId + id, {
    title,
    imageUrl,
    type,
    difficulty,
    description,
  });
}

async function deleteProduct(id) {
  return api.del(endpoints.byId + id);
}

export const dataServices = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
