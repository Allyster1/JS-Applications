function getUserData() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  return userData;
}

function setUserData(userData) {
  sessionStorage.setItem("userData", JSON.stringify(userData));
}

function clearUserData() {
  sessionStorage.removeItem("userData");
}

export const userUtility = {
  getUserData,
  setUserData,
  clearUserData,
};
