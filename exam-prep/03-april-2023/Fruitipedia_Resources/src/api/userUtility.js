function getUserData() {
  const userData = sessionStorage.getItem("userData");
  return userData ? JSON.parse(userData) : null;
}

function setUserData(data) {
  const storage = {
    _id: data._id,
    email: data.email,
    token: data.accessToken,
  };
  sessionStorage.setItem("userData", JSON.stringify(storage));
}

function clearUserData() {
  sessionStorage.removeItem("userData");
}
export { getUserData, setUserData, clearUserData };
