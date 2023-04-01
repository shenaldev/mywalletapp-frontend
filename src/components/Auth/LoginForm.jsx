import FormRow from "../../components/UI/Forms/FormRow";
import Input from "../../components/UI/Forms/Input";
import InputError from "../../components/UI/Forms/InputError";
import Button from "../UI/Button";
import ErrorList from "../UI/Forms/ErrorList";

// Import Libaries
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

function LoginForm(props) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email().label("Email"),
      password: Yup.string().required(),
    }),
    onSubmit: (values) => {
      if (values.email !== "" && values.password !== "") {
        props.onLogin(values.email, values.password);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {props.errors && <ErrorList errors={props.errors} />}
      <FormRow>
        <p className="text-center text-textSecondary font-semibold">Login</p>
      </FormRow>
      <FormRow>
        <Input
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          name="email"
          id="email"
          labelName="Email Address"
        />
        {formik.touched.email && formik.errors.email && <InputError message={formik.errors.email} />}
      </FormRow>
      <FormRow>
        <Input
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          name="password"
          id="password"
          labelName="Password"
        />
        {formik.touched.password && formik.errors.password && <InputError message={formik.errors.password} />}
      </FormRow>
      <div className="flex gap-3 items-center mt-4 mb-6">
        <input type="checkbox" name="remember" id="remember" />
        <label htmlFor="remember">Remember</label>
      </div>

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
    </form>
  );
}

export default LoginForm;
