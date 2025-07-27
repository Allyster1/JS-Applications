import { api } from "./request.js";

const endpoints = {
  all: "/data/games?sortBy=_createdOn%20desc",
  byId: "/data/games/",
  create: "/data/games",
  latest: "/data/games?sortBy=_createdOn%20desc&distinct=category",
};

const commentEndpoints = {
  byGameId: (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`,
  create: "/data/comments",
};

async function getAllProducts() {
  return api.get(endpoints.all);
}

async function getLatestProducts() {
  return api.get(endpoints.latest);
}

async function getProductById(id) {
  return api.get(endpoints.byId + id);
}

async function createProduct(title, category, maxLevel, imageUrl, summary) {
  return api.post(endpoints.create, {
    title,
    category,
    maxLevel,
    imageUrl,
    summary,
  });
}

async function updateProduct(
  id,
  { title, category, maxLevel, imageUrl, summary }
) {
  return api.put(endpoints.byId + id, {
    title,
    category,
    maxLevel,
    imageUrl,
    summary,
  });
}

async function deleteProduct(id) {
  return api.del(endpoints.byId + id);
}

async function getCommentsByGameId(gameId) {
  return api.get(commentEndpoints.byGameId(gameId));
}

async function createComment(gameId, comment) {
  return api.post(commentEndpoints.create, { gameId, comment });
}

export const dataServices = {
  getAllProducts,
  getLatestProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCommentsByGameId,
  createComment,
};
