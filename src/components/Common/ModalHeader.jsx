import { BiXCircle } from "react-icons/bi";

function ModalHeader(props) {
  return (
    <div className="flex justify-between border-b border-b-slate-300 pb-3">
      <h3>{props.title}</h3>
      <button type="button" onClick={props.closeButtonClick}>
        <BiXCircle color="#ff2b2b" size="1.5rem" />
      </button>
    </div>
  );
}

export default ModalHeader;
