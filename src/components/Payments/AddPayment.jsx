import Modal from "../../components/UI/Modal";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import FormRow from "../../components/UI/Forms/FormRow";
import FormGroup from "../../components/UI/Forms/FormGroup";
import Input from "../../components/UI/Forms/Input";
import Spinner from "../../components/UI/Spinner";
import InputError from "../UI/Forms/InputError";
import ErrorList from "../UI/Forms/ErrorList";
import ModalHeader from "../Common/ModalHeader";
//IMPORT LIBS
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
//IMPORT UTILS
import apiClient, { axiosError, webClient } from "../../util/Axios";

function AddPayment(props) {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [validationErrors, setValidationErrors] = useState(false);
  const categories = props.categories;
  const modelHideHandler = () => {
    props.modalHide();
  };

  //FORM VALIATION
  const formik = useFormik({
    initialValues: {
      payment_for: "",
      cost: "",
      date: "",
      category: 1,
      additional_details: "",
    },
    validationSchema: Yup.object({
      payment_for: Yup.string().required().min(3).max(200).label("Payment for"),
      cost: Yup.number().required().label("Cost"),
      date: Yup.date().required().label("Date"),
    }),
    onSubmit: (values) => {
      setIsSubmiting(true);
      addPaymentHandler(values);
    },
  });

  //SAVE DATA IN THE DATABASE
  function addPaymentHandler(values) {
    setValidationErrors(false);
    webClient.get("/sanctum/csrf-cookie");
    apiClient
      .post("/payments/add", values)
      .then((response) => {
        if (response.status == 200) {
          props.onNewPayment();
          setIsSubmiting(false);
          formik.resetForm();
          modelHideHandler();
          toast.success("Payment Saved Successfully!", {
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
        const err = axiosError(error);
        setValidationErrors(err);
        setIsSubmiting(false);
      });
  }

  return (
    <Modal>
      <Card className="min-w-[28rem] max-w-md">
        <ModalHeader title="Add New Payment" closeButtonClick={modelHideHandler} />
        {/**IF HAS ANY ERROR IN BACKEND VALIDATION **/}
        {validationErrors && <ErrorList errors={validationErrors} />}
        {/** CHECK IS FORM SUBMITING **/}
        {!isSubmiting && (
          <form className="mt-4" onSubmit={formik.handleSubmit}>
            <FormRow>
              <Input
                labelName="Payment For"
                id="payment_for"
                name="payment_for"
                placeholder="Education Expenses"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.payment_for}
              />
              {formik.touched.payment_for && formik.errors.payment_for && <InputError message={formik.errors.payment_for} />}
            </FormRow>
            <FormGroup>
              <FormRow>
                <Input
                  labelName="Cost"
                  id="cost"
                  name="cost"
                  type="number"
                  placeholder="100.99"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cost}
                />
                {formik.touched.cost && formik.errors.cost && <InputError message={formik.errors.cost} />}
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
              <label htmlFor="category" className="font-medium text-slate-900">
                Category
              </label>
              <select
                name="category"
                id="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                className="border border-slate-300 rounded px-4 py-2"
              >
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </FormRow>
            <FormRow>
              <Input
                labelName="Additional Details (optional)"
                id="additional_details"
                name="additional_details"
                onChange={formik.handleChange}
                value={formik.values.additional_details}
                required={false}
              />
            </FormRow>
            <FormRow>
              <Button type="submit">Save</Button>
            </FormRow>
          </form>
        )}{" "}
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

export default AddPayment;
