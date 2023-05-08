import { useState } from "react";
//IMPORT COMPONENTS
import FormRow from "../UI/Forms/FormRow";
import Input from "../UI/Forms/Input";
import Button from "../UI/Button";
import ErrorList from "../UI/Forms/ErrorList";
import EmailVerificationModal from "./EmailVerificationModal";
//IMPORT LIBS
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
//IMPORT UTILS
import { toastifyConfig } from "../../util/Util";

function RegisterForm(props) {
  const [showModal, setShowModal] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false); //CHECK IS EMAIL VERIFIED

  const hideModalHandler = () => setShowModal(false);

  const [formikData, setFormikData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConf: "",
  });

  const validationRules = Yup.object({
    name: Yup.string().required().min(3).max(200).label("Name"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(8).max(16).label("Password"),
    passwordConf: Yup.string().required().min(8).max(16).label("Confirm Passwod"),
  });

  /**
   * ON EMAIL VERIFIED UPDATE STATE
   */
  function onEmailVerifiedHandler() {
    setIsEmailVerified(true);
    toast.success("Email Has Verified", toastifyConfig);
  }

  return (
    <Formik
      initialValues={formikData}
      validationSchema={validationRules}
      onSubmit={(values) => {
        if (!isEmailVerified) {
          setShowModal(true);
          return;
        }
        if (values.name != "" && values.email != "" && values.password != "" && values.passwordConf != "") {
          console.log("Else", values);
          props.register(values);
        }
      }}
    >
      {({ values }) => (
        <Form>
          <FormRow>
            <p className="text-center text-textSecondary font-semibold">Register</p>
          </FormRow>
          {props.errors && <ErrorList errors={props.errors} />}
          <FormRow>
            <Input name={"name"} id="name" labelName="Your Name" placeholder="Jone Walker" />
          </FormRow>
          <FormRow>
            <Input type="email" name={"email"} id="email" labelName="Email Address" placeholder="example@mail.com" />
          </FormRow>
          <FormRow>
            <Input type="password" name={"password"} id="password" labelName="Password" />
          </FormRow>
          <FormRow>
            <Input type="password" name={"passwordConf"} id="passwordConf" labelName="Confirm Password" />
          </FormRow>

          {/*----------- FORM SUBMIT BUTTON -------------*/}
          <FormRow className="items-center">
            {/**-------- SHOW SUBMIT IF EMAIL VERIFIED -----------*/}
            {isEmailVerified && (
              <Button type="submit" className="w-52 text-white disabled:bg-gray-300" disabled={props.isSubmiting}>
                {props.isSubmiting ? "Creating..." : "Register"}
              </Button>
            )}
            {!isEmailVerified && (
              <>
                <Button type="submit">Continue</Button>
                <EmailVerificationModal
                  email={values.email}
                  onEmailVerified={onEmailVerifiedHandler}
                  showModal={showModal}
                  setShow={setShowModal}
                  hideModal={hideModalHandler}
                />
              </>
            )}
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
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
