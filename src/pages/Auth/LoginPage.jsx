import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
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
  const { token_expired } = useParams();

  /**
   * Check Is Token Expired
   * @params token_expired url parameter
   */
  const Msg = ({ closeToast, toastProps }) => (
    <div className="tostify__text">
      <p className="text-slate-300 font-medium">Token Expired</p>
      <p className="text-sm text-slate-400">You'r token has expired. Please Login Again.</p>
    </div>
  );

  useEffect(() => {
    if (token_expired) {
      if (token_expired == "401") {
        toast.error(<Msg />, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  }, [token_expired]);

  /**
   * Handle Authentication
   * @param {*} email
   * @param {*} password
   */
  const authentication = (email, password) => {
    webClient.get("/sanctum/csrf-cookie");
    setIsSubmiting(true);
    apiClient
      .post("/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        setLogin();
        navigate("/", { replace: true });
      })
      .catch((errors) => {
        if (errors.response.status === 401) {
          setErrors({ message: errors.response.data.message });
        } else {
          const err = axiosError(errors);
          setErrors(err);
        }
      })
      .finally(() => {
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
