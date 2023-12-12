function FormGroup(props) {
  return <div className={`grid md:grid-cols-2 gap-2 ${props.className ? props.className : undefined}`}>{props.children}</div>;
}

export default FormGroup;
