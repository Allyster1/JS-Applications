let userData = null;

export function saveUserData(userData) {
  sessionStorage.setItem("userData", JSON.stringify(userData));
}

export function getUserData() {
  return userData;
}

export function clearUserData() {
  sessionStorage.removeItem("userData");
  userData = null;
}

// TODO: update the selector depending on the task
export function updateNav() {
  userData = JSON.parse(sessionStorage.getItem("userData"));

  if (userData) {
    document.querySelector(".user").style.display = "inline-block";
    document.querySelector(".guest").style.display = "none";
  } else {
    document.querySelector(".user").style.display = "none";
    document.querySelector(".guest").style.display = "inline-block";
  }
}
