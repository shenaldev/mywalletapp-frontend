import { Modal, ModalContent } from "../UI/Modal";
import Button from "../UI/Button";
import Spinner from "../UI/Spinner";
import Input from "../UI/Forms/Input";
import FormRow from "../UI/Forms/FormRow";
import ErrorList from "../UI/Forms/ErrorList";
import FormGroup from "../UI/Forms/FormGroup";
//IMPORT LIBS
import { useState } from "react";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { DialogTitle } from "@radix-ui/react-dialog";
//IMPORT UTILS
import apiClient, { axiosError, webClient } from "../../util/Axios";
import { toastifyConfig } from "../../util/Util";

function AddIncome(props) {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [validationErrors, setValidationErrors] = useState(false);

  //FORM VALIATION
  const formikInit = {
    from: "",
    value: "",
    date: "",
  };

  const validationRules = Yup.object({
    from: Yup.string().required().min(3).max(200).label("From"),
    value: Yup.number().required().label("Amount"),
    date: Yup.date().required().label("Date"),
  });

  //SAVE DATA IN THE DATABASE
  function addIncomeHandler(values) {
    setValidationErrors(false);
    webClient.get("/sanctum/csrf-cookie");
    apiClient
      .post("/incomes/add", values)
      .then((response) => {
        if (response.status == 200) {
          props.onAdd(response.data.income); // UPDATE INCOMES STATE ON ADD
          props.hideModal();
          toast.success("Income Saved Successfully!", toastifyConfig);
        }
      })
      .catch((error) => {
        console.log("line 66 AddIncome" + error);
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
        <DialogTitle className="mb-4 border-b border-b-slate-200 border-spacing-3">Add New Income</DialogTitle>
        {/**IF HAS ANY ERROR IN BACKEND VALIDATION **/}
        {validationErrors && <ErrorList errors={validationErrors} />}
        {/** CHECK IS FORM SUBMITING **/}
        {!isSubmiting && (
          <Formik
            initialValues={formikInit}
            validationSchema={validationRules}
            onSubmit={(values) => {
              setIsSubmiting(true);
              addIncomeHandler(values);
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

export default AddIncome;
