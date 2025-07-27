import { api } from "./request.js";

const endpoints = {
  all: "/data/pets?sortBy=_createdOn%20desc&distinct=name",
  byId: "/data/pets/",
  create: "/data/pets",
  addDonate: "/data/donation",
  totalDonation: (petId) =>
    `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
  totalForUser: (petId, userId) =>
    `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

async function getAllProducts() {
  return api.get(endpoints.all);
}

async function getProductById(id) {
  return api.get(endpoints.byId + id);
}

async function createProduct(name, breed, age, weight, image) {
  return api.post(endpoints.create, {
    name,
    breed,
    age,
    weight,
    image,
  });
}

async function updateProduct(id, { name, breed, age, weight, image }) {
  return api.put(endpoints.byId + id, {
    name,
    breed,
    age,
    weight,
    image,
  });
}

async function deleteProduct(id) {
  return api.del(endpoints.byId + id);
}

async function addDonations(petId) {
  return api.post(endpoints.addDonate, { petId });
}

async function getTotalDonation(petId) {
  return api.get(endpoints.totalDonation(petId));
}

async function userTotalDonation(petId, userId) {
  return api.get(endpoints.totalForUser(petId, userId));
}

export const dataServices = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addDonations,
  getTotalDonation,
  userTotalDonation,
};
