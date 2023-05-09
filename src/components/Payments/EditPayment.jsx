import { Modal, ModalContent } from "../UI/Modal";
import FormRow from "../UI/Forms/FormRow";
import Input from "../UI/Forms/Input";
import FormGroup from "../UI/Forms/FormGroup";
import ErrorList from "../UI/Forms/ErrorList";
import Button from "../UI/Button";
import Spinner from "../UI/Spinner";
import InputSelect from "../UI/Forms/InputSelect";
//IMPORT LIBS
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
import { DialogTitle } from "@radix-ui/react-dialog";
//IMPORT UTILS
import { toastifyConfig } from "../../util/Util";
import apiClient, { axiosError, webClient } from "../../util/Axios";

function EditPayment(props) {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [validationErrors, setValidationErrors] = useState(false);
  const categories = props.categories;
  const payment = props.payment;
  const additional_details = payment.additional_details ? payment.additional_details.details : "";

  //FORM VALIATION
  const formikInit = {
    payment_for: payment.payment_for,
    cost: payment.amount,
    date: payment.date,
    category: payment.category_id,
    additional_details: additional_details,
  };

  const validationRules = Yup.object({
    payment_for: Yup.string().required().min(3).max(200).label("Payment for"),
    cost: Yup.number().required().label("Cost"),
    date: Yup.date().required().label("Date"),
  });

  /**
   * UPDATE PAYMENT IN THE DATABASE
   * @param {*} values FORM DATA
   */
  function updatePaymentHandler(values) {
    setValidationErrors(false);
    webClient.get("/sanctum/csrf-cookie");
    apiClient
      .put(`/payment/${payment.id}`, values)
      .then((response) => {
        props.onUpdate(response.data.payment, payment); // UPDATE PAYMENTS ON PAYMENTS COMPONENT
        props.hideModal();
        toast.success("Payment Updated Successfully!", toastifyConfig);
      })
      .catch((error) => {
        console.log("Edit Payment Component: ", error);
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
        <DialogTitle className="mb-4 border-b border-b-slate-200 border-spacing-3">Edit Payment</DialogTitle>
        {/**IF HAS ANY ERROR IN BACKEND VALIDATION **/}
        {validationErrors && <ErrorList errors={validationErrors} />}
        {/** CHECK IS FORM SUBMITING **/}
        {!isSubmiting && (
          <Formik
            initialValues={formikInit}
            validationSchema={validationRules}
            onSubmit={(values) => {
              setIsSubmiting(true);
              updatePaymentHandler(values);
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
                <InputSelect name={"category"} id="category" className="border border-slate-300 rounded px-4 py-2">
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
                <Button type="submit">Update</Button>
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

export default EditPayment;
