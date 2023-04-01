function Input(props) {
  return (
    <>
      <label htmlFor={props.id} className="font-medium text-gray-700">
        {props.labelName}
      </label>
      <input
        type={props.type ? props.type : "text"}
        id={props.id}
        onChange={props.onChange ? props.onChange : undefined}
        onBlur={props.onBlur ? props.onBlur : undefined}
        name={props.name}
        defaultValue={props.value ? props.value : undefined}
        className={`border border-gray-300 px-4 py-2 rounded ${props.className ? props.className : undefined}`}
        required={props.required == false ? false : true}
        pattern={props.pattern ? props.pattern : undefined}
        placeholder={props.placeholder ? props.placeholder : undefined}
        {...props.attributes}
      />
    </>
  );
}

export default Input;
