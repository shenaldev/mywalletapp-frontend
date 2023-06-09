import { useField } from "formik";
import InputError from "./InputError";

function Input(props) {
  const [field, meta] = useField(props.name);
  return (
    <>
      <label htmlFor={props.id} className="text-gray-700">
        {props.labelName}
      </label>
      <input
        type={props.type ? props.type : "text"}
        id={props.id}
        placeholder={props.placeholder && props.placeholder}
        className={`border border-gray-300 px-4 py-2 rounded ${props.className ? props.className : undefined}`}
        {...field}
        {...props.attributes}
      />
      {meta.error && meta.touched && <InputError message={meta.error} />}
    </>
  );
}

export default Input;
