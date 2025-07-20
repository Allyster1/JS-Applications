import { getUserData } from "./userUtility.js";

const hostname = "http://localhost:3030";

async function request(method, url, data) {
  const options = {
    method,
    headers: {},
  };

  const userData = getUserData();

  if (data !== undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  if (userData) {
    options.headers["X-Authorization"] = userData.token;
  }

  const response = await fetch(hostname + url, options);

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  if (response.status == 204) return response;
  return response.json();
}

function get(url) {
  return request("GET", url);
}

function post(url, data) {
  return request("POST", url, data);
}

function put(url, data) {
  return request("PUT", url, data);
}

function del(url) {
  return request("DELETE", url);
}

export const api = { get, post, put, del };
