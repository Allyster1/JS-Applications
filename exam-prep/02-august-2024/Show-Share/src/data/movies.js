import { api } from "./request.js";

const endpoints = {
  all: "/data/shows?sortBy=_createdOn%20desc",
  byId: "/data/shows/",
  create: "/data/shows",
  search: `/data/shows?where=title%20LIKE%20%22`,
};

export async function getAllMovies() {
  return api.get(endpoints.all);
}

export async function getMovieById(movieId) {
  return api.get(endpoints.byId + movieId);
}

export async function addMovie(movieData) {
  return api.post(endpoints.create, movieData);
}

export async function updateMovie(movieId, movieData) {
  return api.put(endpoints.byId + movieId, movieData);
}

export async function deleteMovieById(movieId) {
  return api.del(endpoints.byId + movieId);
}

export async function search(query) {
  return api.get(endpoints.search + query + "%22");
}
