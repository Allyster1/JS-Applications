import { api } from "./request.js";

// TODO: update endpoints depending on the task
const endpoints = {
  all: "/data/products",
  byId: "/data/products/",
  create: "/data/products",
};

async function getAllProducts() {
  return api.get(endpoints.all);
}

async function getProductById(id) {
  return api.get(endpoints.byId + id);
}

// TODO: Update depending on the data
async function createProduct(name, imageUrl, category, description, price) {
  return api.post(endpoints.create, {
    name,
    imageUrl,
    category,
    description,
    price,
  });
}

// TODO: Update depending on the data
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

async function deleteProduct(id) {
  return api.del(endpoints.byId + id);
}

// TODO: add any requests for buy/search if needed

export const dataServices = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
