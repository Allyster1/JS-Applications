import { api } from "./requester.js";

const endpoints = {
  getAllTeams: "http://localhost:3030/data/teams",
  members: " http://localhost:3030/data/members",
};

async function getAllTeams() {
  return await api.get(endpoints.getAllTeams);
}

export const dataService = {
  getAllTeams,
};
