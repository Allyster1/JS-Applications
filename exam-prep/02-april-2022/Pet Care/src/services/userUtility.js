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

export function updateNav() {
  userData = JSON.parse(sessionStorage.getItem("userData"));

  if (userData) {
    document.querySelector(".userCreate").style.display = "inline-block";
    document.querySelector(".userLogout").style.display = "inline-block";
    document.querySelector(".guestLogin").style.display = "none";
    document.querySelector(".guestRegister").style.display = "none";
  } else {
    document.querySelector(".guestLogin").style.display = "inline-block";
    document.querySelector(".guestRegister").style.display = "inline-block";
    document.querySelector(".userCreate").style.display = "none";
    document.querySelector(".userLogout").style.display = "none";
  }
}
