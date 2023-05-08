import { useState } from "react";
import { useNavigate } from "react-router-dom";
//IMPORT COMPONENTS
import RegisterForm from "../../components/Auth/RegisterForm";
import AuthLayout from "../../components/UI/AuthLayout";
//IMPORT UTILS
import { setLogin } from "../../util/Auth";
import apiClient, { axiosError, webClient } from "../../util/Axios";

function RegisterPage() {
  const [errors, setErrors] = useState(null);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const navigate = useNavigate();

  //HANDLE REGISTRATION
  const registerHandler = (values) => {
    webClient.get("/sanctum/csrf-cookie");
    setIsSubmiting(true);
    setErrors(null);
    apiClient
      .post("/register", {
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.passwordConf,
      })
      .then((response) => {
        setLogin(); // SET LOCALSTORAGE VALUES
        navigate("/", { replace: true });
      })
      .catch((errors) => {
        const err = axiosError(errors);
        setErrors(err);
      })
      .finally(() => {
        setIsSubmiting(false);
      });
  };

  return (
    <AuthLayout>
      <RegisterForm register={registerHandler} isSubmiting={isSubmiting} errors={errors} />
    </AuthLayout>
  );
}

export default RegisterPage;
