import { getUserData } from "../utils/userData.js";

const hostname = "http://localhost:3030";

async function request(method, url, data) {
  const userData = getUserData();

  const options = {
    method,
    headers: {},
  };

  if (userData?.token) {
    options.headers["X-Authorization"] = userData.token;
  }

  if (data !== undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  const response = await fetch(hostname + url, options);

  if (!response.ok) {
    let message = `${response.status} ${response.statusText}`;
    try {
      const error = await response.json();
      if (error?.message) message = error.message;
    } catch {
      // using default message
    }
    throw new Error(message);
  }

  if (response.status == 204) return;
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

export { get, post, put, del };
