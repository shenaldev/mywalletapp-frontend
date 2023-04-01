import { Navigate, Outlet, redirect } from "react-router-dom";
import { isAuth } from "./util/Auth";

function AuthRoot() {
  const auth = isAuth();

  if (auth) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AuthRoot;
