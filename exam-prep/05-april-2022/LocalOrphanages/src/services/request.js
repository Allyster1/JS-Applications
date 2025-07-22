import { getUserData } from "./userUtility";

const host = "http://localhost:3030";

async function request(method, url, data) {
  const options = {
    method,
    headers: {},
  };

  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  const userData = getUserData();

  if (userData) {
    options.headers["X-Authorization"] = userData.accessToken;
  }

  try {
    const response = fetch(host + url, options);

    if (response.status === 204) {
      return response;
    }

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    return result;
  } catch (error) {
    alert(error.message);
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
