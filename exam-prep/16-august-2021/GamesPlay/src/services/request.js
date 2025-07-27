import { clearUserData, getUserData } from "./userUtility.js";

const host = "http://localhost:3030";

export async function request(method, url, data) {
  const options = {
    method,
    headers: {},
  };

  if (data !== undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  const userData = getUserData();

  if (userData) {
    options.headers["X-Authorization"] = userData.accessToken;
  }

  const response = await fetch(host + url, options);

  if (!response.ok) {
    const error = await response.json();
    console.error(error.message);

    if (error.message == "Invalid access token") {
      clearUserData();
    }

    throw error;
  }

  if (response.status === 204) {
    return response;
  }

  return response.json();
}

async function get(url) {
  return request("GET", url);
}

async function post(url, data) {
  return request("POST", url, data);
}

async function put(url, data) {
  return request("PUT", url, data);
}

async function del(url, data) {
  return request("DELETE", url, data);
}

export const api = { get, post, put, del };
