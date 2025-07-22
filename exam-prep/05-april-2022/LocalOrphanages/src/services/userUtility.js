let userData = null;

export function saveUserData(userData) {
  if (userData !== undefined && userData !== null) {
    sessionStorage.setItem("userData", JSON.stringify(userData));
  }
}

export function getUserData() {
  return userData;
}

export function clearUserData() {
  sessionStorage.removeItem("userData");
  userData = null;
}

export function updateNav() {
  const data = sessionStorage.getItem("userData");
  if (data && data !== "undefined") {
    userData = JSON.parse(data);
  } else {
    userData = null;
  }

  if (userData) {
    document.getElementById("user").style.display = "inline-block";
    document.getElementById("guest").style.display = "none";
  } else {
    document.getElementById("user").style.display = "none";
    document.getElementById("guest").style.display = "inline-block";
  }
}
