import { userUtility } from "./userUtility.js";

export function updateNav() {
  const userData = userUtility.getUserData();
  const userNav = document.querySelectorAll("nav a[data-nav='user']");
  const guestNav = document.querySelectorAll("nav a[data-nav='guest']");

  if (userData) {
    guestNav.forEach((x) => (x.style.display = "none"));
    userNav.forEach((x) => (x.style.display = "inline-block"));
  } else {
    guestNav.forEach((x) => (x.style.display = "inline-block"));
    userNav.forEach((x) => (x.style.display = "none"));
  }
}
