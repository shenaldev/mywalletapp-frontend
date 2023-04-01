import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Import Pages And Components
import RegisterForm from "../../components/Auth/RegisterForm";
import AuthLayout from "../../components/UI/AuthLayout";
import { setLogin } from "../../util/Auth";

//Import Helpers
import apiClient, { axiosError, webClient } from "../../util/Axios";

function RegisterPage() {
  const [errors, setErrors] = useState(null);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const navigate = useNavigate();

  //Handle Registration
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
        setIsSubmiting(false);
        setLogin(); // SET LOCALSTORAGE VALUES
        navigate("/", { replace: true });
      })
      .catch((errors) => {
        setIsSubmiting(false);
        const err = axiosError(errors);
        setErrors(err);
      });
  };

  return (
    <AuthLayout>
      <RegisterForm register={registerHandler} isSubmiting={isSubmiting} errors={errors} />
    </AuthLayout>
  );
}

export default RegisterPage;
