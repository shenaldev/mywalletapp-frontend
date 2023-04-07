import Card from "../UI/Card";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import Spinner from "../UI/Spinner";
import Input from "../UI/Forms/Input";
import FormRow from "../UI/Forms/FormRow";
import ErrorList from "../UI/Forms/ErrorList";
import InputError from "../UI/Forms/InputError";
import FormGroup from "../UI/Forms/FormGroup";
import ModalHeader from "../Common/ModalHeader";
//IMPORT LIBS
import { useState } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
//IMPORT UTILS
import apiClient, { axiosError, webClient } from "../../util/Axios";

function AddIncome(props) {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [validationErrors, setValidationErrors] = useState(false);
  //Modal Hide Handler
  const modelHideHandler = () => props.modalHide();

  //FORM VALIATION
  const formik = useFormik({
    initialValues: {
      from: "",
      value: "",
      date: "",
    },
    validationSchema: Yup.object({
      from: Yup.string().required().min(3).max(200).label("From"),
      value: Yup.number().required().label("Amount"),
      date: Yup.date().required().label("Date"),
    }),
    onSubmit: (values) => {
      setIsSubmiting(true);
      addIncomeHandler(values);
    },
  });

  //SAVE DATA IN THE DATABASE
  function addIncomeHandler(values) {
    setValidationErrors(false);
    webClient.get("/sanctum/csrf-cookie");
    apiClient
      .post("/incomes/add", values)
      .then((response) => {
        if (response.status == 200) {
          props.onAdd(); // RELOAD DATA WHEN NEW REACORD ADDED
          setIsSubmiting(false);
          formik.resetForm();
          modelHideHandler();
          toast.success("Income Saved Successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      })
      .catch((error) => {
        console.log("line 66 AddIncome" + error);
        const err = axiosError(error);
        setValidationErrors(err);
        setIsSubmiting(false);
      });
  }

  return (
    <Modal>
      <Card className="max-w-xs max-h-[90vh] md:min-w-[28rem] md:max-w-md overflow-y-auto">
        <ModalHeader title="Add New Income" closeButtonClick={modelHideHandler} />
        {/**IF HAS ANY ERROR IN BACKEND VALIDATION **/}
        {validationErrors && <ErrorList errors={validationErrors} />}
        {/** CHECK IS FORM SUBMITING **/}
        {!isSubmiting && (
          <form className="mt-4" onSubmit={formik.handleSubmit}>
            <FormRow>
              <Input
                labelName="From"
                id="from"
                name="from"
                placeholder="Salaries"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.from}
              />
              {formik.touched.from && formik.errors.from && <InputError message={formik.errors.from} />}
            </FormRow>
            <FormGroup>
              <FormRow>
                <Input
                  labelName="Amount"
                  id="value"
                  name="value"
                  type="number"
                  placeholder="100.99"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.value}
                />
                {formik.touched.value && formik.errors.value && <InputError message={formik.errors.value} />}
              </FormRow>
              <FormRow>
                <Input
                  labelName="Date"
                  id="date"
                  name="date"
                  type="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.date}
                />
                {formik.touched.date && formik.errors.date && <InputError message={formik.errors.date} />}
              </FormRow>
            </FormGroup>
            <FormRow>
              <Input
                labelName="Additional Details (optional)"
                id="additional_details"
                name="additional_details"
                required={false}
                onChange={formik.handleChange}
                value={formik.values.additional_details}
              />
            </FormRow>
            <FormRow>
              <Button type="submit">Save</Button>
            </FormRow>
          </form>
        )}
        {/** END OF ISSUBMITING CHECK **/}
        {/** IF IS FORM SUBMITING SHOW LOADING */}
        {isSubmiting && (
          <div className="text-center text-slate-900 font-medium mt-4">
            <h4 className="mb-4 text-lg">Saving Data...</h4>
            <Spinner />
          </div>
        )}
      </Card>
    </Modal>
  );
}

export default AddIncome;
