function Spinner(props) {
  return (
    <div
      className={`${
        props.className ? props.className : ""
      } inline-block animate-spin rounded-full h-8 w-8 border-b-4 border-yellow-500`}
    ></div>
  );
}

export default Spinner;
