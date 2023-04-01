export function isAuth() {
  const auth = localStorage.getItem("isAuth");
  if (auth == null) {
    return false;
  }

  return true;
}

export function setLogin() {
  localStorage.setItem("isAuth", true);
}

export function setLogout() {
  localStorage.removeItem("isAuth");
}
