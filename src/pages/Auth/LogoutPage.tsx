import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//Import Components
import AuthLayout from "../../components/UI/AuthLayout";
import Spinner from "../../components/UI/Spinner";
//Import Utils
import { setLogout } from "../../util/Auth";
import apiClient from "../../util/Axios";

function LogoutPage() {
  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    apiClient
      .post("/logout")
      .then((response) => {
        setIsLogout(true);
        setLogout();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setIsLogout(true);
        }
      });
  }, []);

  return (
    <AuthLayout className="text-center">
      <h3 className="text-xl font-semibold mb-4">{isLogout ? "Logout Success" : "Please Wait Login Out"} </h3>
      {isLogout && (
        <Link to="/auth/login" className="text-lg font-medium  text-blue-600 hover:text-blue-500 hover:underline">
          Login Page
        </Link>
      )}
      {!isLogout && <Spinner />}
    </AuthLayout>
  );
}

export default LogoutPage;
