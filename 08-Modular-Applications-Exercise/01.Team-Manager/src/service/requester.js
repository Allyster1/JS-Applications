import { userUtility } from "../utility/userUtility.js";

async function requester(method, url, data) {
  const options = {
    method,
    headers: {},
  };

  const userData = userUtility.getUserData();

  if (userData) {
    options.headers["X-Authorization"] = userData.accessToken;
  }

  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(response.json().message);
    }

    if ((response.status = 204)) return response;

    return await response.json();
  } catch (error) {
    alert(error);
    return;
  }
}

async function get(url) {
  return await requester("GET", url);
}

async function post(url, data) {
  return await requester("POST", url, data);
}

async function put(url, data) {
  return await requester("PUT", url, data);
}

async function del(url) {
  return await requester("DELETE", url);
}

export const api = { get, post, put, del };
