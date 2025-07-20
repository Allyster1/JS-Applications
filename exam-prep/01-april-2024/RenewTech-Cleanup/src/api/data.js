import * as api from "./api.js";

const host = "http://localhost:3030";
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// Application-specific request
// get all listings
export async function getAllFacts() {
  return await api.get(host + "/data/solutions?sortBy=_createdOn%20desc");
}

// get listing by id
export async function getFactById(id) {
  return await api.get(host + `/data/solutions/${id}`);
}

// create listing
export async function addFact(fact) {
  return await api.post(host + "/data/solutions", fact);
}

// edit listing by id
export async function editFactById(id, fact) {
  return await api.put(host + `/data/solutions/${id}`, fact);
}

// delete listing by id
export async function deleteFactById(id) {
  return await api.del(host + `/data/solutions/${id}`);
}

export async function like(solutionId) {
  return await api.post(host + `/data/likes`, solutionId);
}

export async function getTotalLikes(solutionId) {
  return await api.get(
    host +
      `/data/likes?where=solutionId%3D%22${solutionId}%22&distinct=_ownerId&count`
  );
}

export async function didUserLiked(solutionId, userId) {
  return await api.get(
    host +
      `/data/likes?where=solutionId%3D%22${solutionId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}
