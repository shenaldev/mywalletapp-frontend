//IMPORT ICONS
import { BsPencil, BsTrash, BsEye } from "react-icons/bs";

function ActionButtons({ showModalHandler, payment, onEdit, onDelete }) {
  return (
    <>
      <button className="px-2 py-1 bg-blue-500" onClick={showModalHandler}>
        <BsEye color="white" />
      </button>
      <button className="px-2 py-1 bg-yellow-500" onClick={onEdit ? onEdit.bind(this, payment) : undefined}>
        <BsPencil color="white" />
      </button>
      <button className="px-2 py-1 bg-red-500 " onClick={onDelete ? onDelete.bind(this, payment.id) : undefined}>
        <BsTrash color="white" />
      </button>
    </>
  );
}

export default ActionButtons;
