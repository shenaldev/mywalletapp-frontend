function Card(props) {
  return (
    <div className={`${props.className ? props.className : undefined} bg-white px-6 shadow-sm py-6 rounded-md`}>
      {props.children}
    </div>
  );
}

export default Card;
