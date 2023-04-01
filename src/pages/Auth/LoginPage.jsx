import { useState } from "react";
import { useNavigate } from "react-router-dom";
//Import Components
import LoginForm from "../../components/Auth/LoginForm";
import AuthLayout from "../../components/UI/AuthLayout";
//Import Utils
import apiClient, { webClient, axiosError } from "../../util/Axios";
import { setLogin } from "../../util/Auth";

function LoginPage() {
  const [errors, setErrors] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const navigate = useNavigate();

  const authentication = (email, password) => {
    webClient.get("/sanctum/csrf-cookie");
    setIsSubmiting(true);
    apiClient
      .post("/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        setIsSubmiting(false);
        setLogin();
        navigate("/", { replace: true });
      })
      .catch((errors) => {
        console.log(errors.response.data);
        const err = axiosError(errors);
        setErrors(err);
        setIsSubmiting(false);
      });
  };

  return (
    <AuthLayout>
      <LoginForm onLogin={authentication} errors={errors} isSubmiting={isSubmiting} />
    </AuthLayout>
  );
}

export default LoginPage;
