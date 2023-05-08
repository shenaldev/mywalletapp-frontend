import FormRow from "../../components/UI/Forms/FormRow";
import Input from "../../components/UI/Forms/Input";
import Button from "../UI/Button";
import ErrorList from "../UI/Forms/ErrorList";
//IMPORT LIBS
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

function LoginForm(props) {
  const formikInit = {
    email: "",
    password: "",
  };

  const validationRules = Yup.object({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required(),
  });

  return (
    <Formik
      initialValues={formikInit}
      validationSchema={validationRules}
      onSubmit={(values) => {
        if (values.email !== "" && values.password !== "") {
          props.onLogin(values.email, values.password);
        }
      }}
    >
      <Form>
        {props.errors && <ErrorList errors={props.errors} />}
        <FormRow>
          <p className="text-center text-textSecondary font-semibold">Login</p>
        </FormRow>
        <FormRow>
          <Input type="email" name={"email"} id="email" labelName="Email Address" />
        </FormRow>
        <FormRow>
          <Input type="password" name={"password"} id="password" labelName="Password" />
        </FormRow>
        {/*----------- FORM SUBMIT BUTTON -------------*/}
        <FormRow className="items-center">
          <Button type="submit" className="w-52 text-white disabled:bg-gray-300" disabled={props.isSubmiting}>
            {props.isSubmiting ? "Authenticating..." : "Login"}
          </Button>
        </FormRow>

        {/*----------- PAGE NAVIGATION LINKS -------------*/}
        <div className="flex justify-between mt-12">
          <Link to="/auth/register" className="text-sm text-gray-600 hover:underline">
            Create An Account
          </Link>
          <Link to="/forgot-password" className="text-sm text-gray-600 hover:underline">
            Forgot Password
          </Link>
        </div>
      </Form>
    </Formik>
  );
}

export default LoginForm;
