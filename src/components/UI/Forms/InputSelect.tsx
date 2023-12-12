import { useField } from "formik";
import InputError from "./InputError";

function InputSelect(props) {
  const [field, meta] = useField(props.name);
  return (
    <>
      {props.labelName && (
        <label htmlFor={props.id} className="text-gray-500">
          {props.labelName}
        </label>
      )}
      <select
        id={props.id}
        className={`border border-slate-300 rounded px-4 py-2 ${props.className ? props.className : ""}`}
        {...field}
      >
        {props.children}
      </select>
      {meta.error && meta.touched && <InputError message={meta.error} />}
    </>
  );
}

export default InputSelect;
