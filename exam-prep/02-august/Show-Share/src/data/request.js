import { getUserData } from "../utility.js";

const hostname = "http://localhost:3030";

export async function request(method, url, data) {
  const options = {
    method,
    headers: {},
  };

  const userData = getUserData();

  if (userData) {
    options.headers["X-Authorization"] = userData.accessToken;
  }

  if (data !== undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(hostname + url, options);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Request failed");
    }

    if (response.status === 204) {
      return response;
    }

    return response.json();
  } catch (error) {
    alert(error);
  }
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

function del(url, data) {
  return request("DELETE", url, data);
}

export const api = {
  get,
  post,
  put,
  del,
};
