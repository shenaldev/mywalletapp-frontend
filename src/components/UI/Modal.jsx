import ReactDOM from "react-dom";

const ModalConent = (props) => {
  return <div className="w-full h-full bg-black/[0.4] grid place-items-center fixed z-40">{props.children}</div>;
};

function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalConent onCartHide={props.onCartHide} title={props.title} modalFooter={props.modalFooter}>
          {props.children}
        </ModalConent>,
        document.getElementById("modal-root")
      )}
    </>
  );
}

export default Modal;
