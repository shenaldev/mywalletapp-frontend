function FormGroup(props) {
  return <div className={`grid grid-cols-2 gap-2 ${props.className ? props.className : undefined}`}>{props.children}</div>;
}

export default FormGroup;
