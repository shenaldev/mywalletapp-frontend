import { BsPencil, BsTrash, BsEye } from "react-icons/bs";

function ActionButtons({ showModalHandler, income, onEdit, onDelete }) {
  return (
    <>
      <button className="px-2 py-1 bg-blue-500" onClick={showModalHandler}>
        <BsEye color="white" />
      </button>
      <button className="px-2 py-1 bg-yellow-500" onClick={onEdit ? onEdit.bind(this, income) : undefined}>
        <BsPencil color="white" />
      </button>
      <button className="px-2 py-1 bg-red-500 " onClick={onDelete ? onDelete.bind(this, income.id) : undefined}>
        <BsTrash color="white" />
      </button>
    </>
  );
}

export default ActionButtons;
