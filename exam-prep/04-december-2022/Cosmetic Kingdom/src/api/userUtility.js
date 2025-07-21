function setUserData(data) {
  const storage = {
    _id: data._id,
    email: data.email,
    token: data.accessToken,
  };
  sessionStorage.setItem("userData", JSON.stringify(storage));
}

function getUserData() {
  const userData = sessionStorage.getItem("userData");
  return userData ? JSON.parse(userData) : null;
}

function updateNav() {
  const userData = getUserData();

  if (userData) {
    document.querySelector(".user").style.display = "inline-block";
    document.querySelector(".guest").style.display = "none";
  } else {
    document.querySelector(".user").style.display = "none";
    document.querySelector(".guest").style.display = "inline-block";
  }
}

async function clearUserData() {
  sessionStorage.removeItem("userData");
  updateNav();
}

export { getUserData, setUserData, clearUserData, updateNav };
