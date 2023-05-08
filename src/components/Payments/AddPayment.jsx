import { Modal, ModalContent } from "../../components/UI/Modal";
import Button from "../../components/UI/Button";
import FormRow from "../../components/UI/Forms/FormRow";
import FormGroup from "../../components/UI/Forms/FormGroup";
import Input from "../../components/UI/Forms/Input";
import Spinner from "../../components/UI/Spinner";
import ErrorList from "../UI/Forms/ErrorList";
import InputSelect from "../UI/Forms/InputSelect";
//IMPORT LIBS
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
import { DialogTitle } from "@radix-ui/react-dialog";
//IMPORT UTILS
import apiClient, { axiosError, webClient } from "../../util/Axios";
import { toastifyConfig } from "../../util/Util";

function AddPayment(props) {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [validationErrors, setValidationErrors] = useState(false);
  const categories = props.categories;

  //FORM VALIATION
  const formikInit = {
    payment_for: "",
    cost: "",
    date: "",
    category: 6,
    additional_details: "",
  };

  const validationRules = Yup.object({
    payment_for: Yup.string().required().min(3).max(200).label("Payment for"),
    cost: Yup.number().required().label("Cost"),
    date: Yup.date().required().label("Date"),
  });

  //SAVE DATA IN THE DATABASE
  function addPaymentHandler(values) {
    setValidationErrors(false);
    webClient.get("/sanctum/csrf-cookie");
    apiClient
      .post("/payments/add", values)
      .then((response) => {
        if (response.status == 200) {
          props.onAdd(response.data.payment); // UPDATE PAYMENTS ON PAYMENTS COMPONENT
          props.hideModal();
          toast.success("Payment Saved Successfully!", toastifyConfig);
        }
      })
      .catch((error) => {
        console.log("Error Add Payment Handler: ", error);
        const err = axiosError(error);
        setValidationErrors(err);
      })
      .finally(() => {
        setIsSubmiting(false);
      });
  }

  return (
    <Modal open={props.showModal} onOpenChange={props.setShow}>
      <ModalContent>
        <DialogTitle className="mb-4 border-b border-b-slate-200 border-spacing-3">Add New Payment</DialogTitle>
        {/**IF HAS ANY ERROR IN BACKEND VALIDATION **/}
        {validationErrors && <ErrorList errors={validationErrors} />}
        {/** CHECK IS FORM SUBMITING **/}
        {!isSubmiting && (
          <Formik
            initialValues={formikInit}
            validationSchema={validationRules}
            onSubmit={(values) => {
              setIsSubmiting(true);
              addPaymentHandler(values);
            }}
          >
            <Form className="mt-4">
              <FormRow>
                <Input name={"payment_for"} labelName="Payment For" id="payment_for" placeholder="Education Expenses" />
              </FormRow>
              <FormGroup>
                <FormRow>
                  <Input name={"cost"} labelName="Cost" id="cost" type="number" placeholder="100.99" />
                </FormRow>
                <FormRow>
                  <Input name={"date"} labelName="Date" id="date" type="date" />
                </FormRow>
              </FormGroup>
              <FormRow>
                <label htmlFor="category" className="font-medium text-slate-900">
                  Category
                </label>
                <InputSelect name={"category"} id="category">
                  {categories.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </InputSelect>
              </FormRow>
              <FormRow>
                <Input
                  name={"additional_details"}
                  labelName="Additional Details (optional)"
                  id="additional_details"
                  required={false}
                />
              </FormRow>
              <FormRow>
                <Button type="submit">Save</Button>
              </FormRow>
            </Form>
          </Formik>
        )}{" "}
        {/** END OF ISSUBMITING CHECK **/}
        {/** IF IS FORM SUBMITING SHOW LOADING */}
        {isSubmiting && (
          <div className="text-center text-slate-900 font-medium mt-4">
            <h4 className="mb-4 text-lg">Saving Data...</h4>
            <Spinner />
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AddPayment;
