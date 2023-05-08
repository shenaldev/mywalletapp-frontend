import { useState } from "react";
//IMPORT UTILS
import { formatMonthDay } from "../../util/Dates";
import { numberFormat } from "../../util/Util";
//IMPORT ICONS
import { BsPencil, BsTrash, BsEye } from "react-icons/bs";
import AdditionalDetailsModal from "./AdditionalDetailsModal";

function IncomeItem(props) {
  const income = props.income;
  const [showDetails, setShowDetils] = useState(false);

  // MODAL SHOW AND HIDE FUNCTIONS
  const showModalHandler = () => setShowDetils(true);

  return (
    <>
      <li
        key={income.id}
        className="flex justify-between border-b border-b-slate-200 border-spacing-2 mb-2 relative transaction-list"
      >
        <span>{formatMonthDay(income.date)}</span>
        <span className="capitalize">{income.from}</span>
        <span>{numberFormat(income.value)}</span>
        <div className="absolute top-0 right-0 action-icons">
          {/** SHOW ADDIDTIONAL DETAILS BUTTON IF HAVE ADDITIONAL DETAILS */}
          {income.additional_details && (
            <button className="px-2 py-1 bg-blue-500" onClick={showModalHandler}>
              <BsEye color="white" />
            </button>
          )}
          <button className="px-2 py-1 bg-yellow-500" onClick={props.onEdit ? props.onEdit.bind(this, income) : undefined}>
            <BsPencil color="white" />
          </button>
          <button className="px-2 py-1 bg-red-500 " onClick={props.onDelete ? props.onDelete.bind(this, income.id) : undefined}>
            <BsTrash color="white" />
          </button>
        </div>
      </li>
      {/** SHOW ADDITIONAL DETAILS MODAL */}
      {showDetails && <AdditionalDetailsModal income={income} showModal={showDetails} setShow={setShowDetils} />}
    </>
  );
}

export default IncomeItem;
