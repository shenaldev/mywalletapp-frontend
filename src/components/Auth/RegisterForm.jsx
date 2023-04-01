import FormRow from "../UI/Forms/FormRow";
import Input from "../UI/Forms/Input";
import InputError from "../UI/Forms/InputError";
import Button from "../UI/Button";
import ErrorList from "../UI/Forms/ErrorList";

// Import Libaries
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

function RegisterForm(props) {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConf: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required().min(3).max(200).label("Name"),
      email: Yup.string().required().email().label("Email"),
      password: Yup.string().required().min(8).max(16).label("Password"),
      passwordConf: Yup.string().required().min(8).max(16).label("Confirm Passwod"),
    }),
    onSubmit: (values) => {
      if (values.name != "" && values.email != "" && values.password != "" && values.passwordConf != "") {
        props.register(values);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormRow>
        <p className="text-center text-textSecondary font-semibold">Register</p>
      </FormRow>
      {props.errors && <ErrorList errors={props.errors} />}
      <FormRow>
        <Input
          type="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          name="name"
          id="name"
          labelName="Your Name"
          placeholder="Jone Walker"
        />
        {formik.touched.name && formik.errors.name && <InputError message={formik.errors.name} />}
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
          placeholder="example@mail.com"
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
      <FormRow>
        <Input
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.passwordConf}
          name="passwordConf"
          id="passwordConf"
          labelName="Confirm Password"
        />
        {formik.touched.passwordConf && formik.errors.passwordConf && <InputError message={formik.errors.passwordConf} />}
      </FormRow>

      {/*----------- FORM SUBMIT BUTTON -------------*/}
      <FormRow className="items-center">
        <Button type="submit" className="w-52 text-white disabled:bg-gray-300" disabled={props.isSubmiting}>
          {props.isSubmiting ? "Creating..." : "Register"}
        </Button>
      </FormRow>

      {/*----------- PAGE NAVIGATION LINKS -------------*/}
      <div className="flex justify-between mt-12">
        <Link to="/auth/login" className="text-sm text-gray-600 hover:underline">
          Login
        </Link>
        <Link to="/forgot-password" className="text-sm text-gray-600 hover:underline">
          Forgot Password
        </Link>
      </div>
    </form>
  );
}

export default RegisterForm;
