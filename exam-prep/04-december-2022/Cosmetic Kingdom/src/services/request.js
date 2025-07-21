import { getUserData } from "./userUtility.js";

const host = "http://localhost:3030";

async function request(method, url, data) {
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
    const response = await fetch(host + url, options);

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
