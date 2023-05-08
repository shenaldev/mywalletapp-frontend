import { Modal, ModalContent } from "../UI/Modal";
import Button from "../UI/Button";
import Spinner from "../UI/Spinner";
import Input from "../UI/Forms/Input";
import FormRow from "../UI/Forms/FormRow";
import ErrorList from "../UI/Forms/ErrorList";
import InputError from "../UI/Forms/InputError";
import FormGroup from "../UI/Forms/FormGroup";
//IMPORT LIBS
import { useState } from "react";
import { toast } from "react-toastify";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { DialogTitle } from "@radix-ui/react-dialog";
//IMPORT UTILS
import apiClient, { axiosError, webClient } from "../../util/Axios";
import { toastifyConfig } from "../../util/Util";

function EditIncome(props) {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [validationErrors, setValidationErrors] = useState(false);
  const income = props.income;
  const additional_details = income.additional_details ? income.additional_details.details : "";

  //FORM VALIATION
  const formikInit = {
    from: income.from,
    value: income.value,
    date: income.date,
    additional_details: additional_details,
  };

  const validationRules = Yup.object({
    from: Yup.string().required().min(3).max(200).label("From"),
    value: Yup.number().required().label("Amount"),
    date: Yup.date().required().label("Date"),
  });

  /**
   * UPDATE INCOME IN THE DATABASE
   * @param {*} values FORM DATA
   */
  function updateIncomeHandler(values) {
    setValidationErrors(false);
    webClient.get("/sanctum/csrf-cookie");
    apiClient
      .put(`/income/${income.id}`, values)
      .then((response) => {
        props.onUpdate(response.data.income, income.value); // UPDATE INCOMES ON INCOMES COMPONENT
        props.hideModal();
        toast.success("Income updated successfully", toastifyConfig);
      })
      .catch((error) => {
        console.log("Edit Income UpdateIncomeHandler(): ", error);
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
        <DialogTitle>Edit Payment</DialogTitle>
        {/**IF HAS ANY ERROR IN BACKEND VALIDATION **/}
        {validationErrors && <ErrorList errors={validationErrors} />}
        {/** CHECK IS FORM SUBMITING **/}
        {!isSubmiting && (
          <Formik
            initialValues={formikInit}
            validationSchema={validationRules}
            onSubmit={(values) => {
              setIsSubmiting(true);
              updateIncomeHandler(values);
            }}
          >
            <Form className="mt-4">
              <FormRow>
                <Input name={"from"} labelName="From" id="from" placeholder="Salaries" />
              </FormRow>
              <FormGroup>
                <FormRow>
                  <Input name={"value"} labelName="Amount" id="value" type="number" placeholder="100.99" />
                </FormRow>
                <FormRow>
                  <Input name={"date"} labelName="Date" id="date" type="date" />
                </FormRow>
              </FormGroup>
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
        )}
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

export default EditIncome;
