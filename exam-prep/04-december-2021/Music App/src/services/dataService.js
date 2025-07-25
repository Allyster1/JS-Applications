import { api } from "./request.js";

const endpoints = {
  all: "/data/albums?sortBy=_createdOn%20desc&distinct=name",
  byId: "/data/albums/",
  create: "/data/albums",
  search: (query) => `/data/albums?where=name%20LIKE%20%22${query}%22`,
};

async function getAllProducts() {
  return api.get(endpoints.all);
}

async function getProductById(id) {
  return api.get(endpoints.byId + id);
}

async function createProduct(
  name,
  imgUrl,
  price,
  releaseDate,
  artist,
  genre,
  description
) {
  return api.post(endpoints.create, {
    name,
    imgUrl,
    price,
    releaseDate,
    artist,
    genre,
    description,
  });
}

async function updateProduct(
  id,
  { name, imgUrl, price, releaseDate, artist, genre, description }
) {
  return api.put(endpoints.byId + id, {
    name,
    imgUrl,
    price,
    releaseDate,
    artist,
    genre,
    description,
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
