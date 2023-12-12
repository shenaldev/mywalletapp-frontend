import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
//IMPORT COMPONENTS
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Modal, ModalContent } from "../UI/Modal";
import FormRow from "../UI/Forms/FormRow";
import Input from "../UI/Forms/Input";
import Button from "../UI/Button";
//IMPORT UTILS
import apiClient from "../../util/Axios";

function EmailVerificationModal(props) {
  const email = props.email;
  const [errors, setErrors] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState(false);

  const [formikValues, setFormikValues] = useState({
    code: "",
  });

  const validationRules = Yup.object({
    code: Yup.string().required().max(6, "Verification Code must be less than 6 numbers").min(6).label("Verification Code"),
  });

  /**
   * SEND VERIFICATION EMAIL ON MODAL OPEN
   */
  useEffect(() => {
    setErrors(false);
    if (props.showModal) {
      apiClient
        .post("/email/send-verification", { email: email })
        .then((response) => {
          if (response.status === 200) {
            setErrors(false);
          }
        })
        .catch((error) => {
          console.log("Email Verification Send Axios: ", error);
          if (error.response.status == 422) {
            setErrors({ message: error.response.data.message });
          } else {
            setErrors({ message: "Somethings Wrong Please Try Again Later" });
          }
        });
    }
  }, [props.showModal]);

  /**
   * VERIFY EMAIL
   * @param {*} code Verification Code
   */
  function submitHandler({ code }) {
    setValidationError(false);
    setIsValidating(true);
    apiClient
      .post("/email/verify", {
        email: props.email,
        code: code,
      })
      .then((response) => {
        if (response.status === 203) {
          setValidationError({ message: "Invalid Code" });
          return;
        }
        if (response.status === 200 && response.data.valid) {
          props.onEmailVerified();
          props.hideModal();
        }
      })
      .catch((error) => {
        console.log("sumbitHandler: ", error);
        setValidationError({ message: "Server Error Please Try Again Later." });
      })
      .finally(() => {
        setIsValidating(false);
      });
  }

  return (
    <Modal open={props.showModal} onOpenChange={props.setShow}>
      <ModalContent>
        <DialogTitle className="mb-4 border-b border-b-slate-200 border-spacing-3">Verify Email Address</DialogTitle>
        {!errors && (
          <>
            <DialogDescription className="text-lightBlack text-sm mb-6">
              Please Verify You'r Email Address To Continue. Verification Email Has Send To Your Email Address.
            </DialogDescription>
            {/** FORMIK VERIFICATION FORM */}
            <Formik initialValues={formikValues} validationSchema={validationRules} onSubmit={(data) => submitHandler(data)}>
              <Form>
                <FormRow>
                  <Input type="number" name={"code"} labelName="Verification Code" id="verification_code" />
                </FormRow>
                <FormRow>
                  <Button type="submit" disabled={isValidating}>
                    {isValidating ? "Wait" : "Verify"}
                  </Button>
                </FormRow>
              </Form>
            </Formik>
          </>
        )}
        {/** SHOW ERRORS */}
        {validationError && <p className="font-medium text-white bg-red-500 px-4 py-2 rounded-md">{validationError.message}</p>}
        {errors && <p className="font-medium text-white bg-red-500 px-4 py-2 rounded-sm">{errors.message}</p>}
      </ModalContent>
    </Modal>
  );
}

export default EmailVerificationModal;
