function FormRow(props) {
  return <div className={`flex flex-col gap-2 mb-5 ${props.className ? props.className : undefined}`}>{props.children}</div>;
}

export default FormRow;
