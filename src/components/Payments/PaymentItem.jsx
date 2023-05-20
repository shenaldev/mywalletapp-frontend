import { useState } from "react";
//IMPORT COMPONENTS
import AdditionalDetailModal from "./AdditionalDetailsModal";
//IMPORT ICONS
import { BsPencil, BsTrash, BsEye } from "react-icons/bs";
//IMPORT UTILS
import { formatMonthDay } from "../../util/Dates";
import { numberFormat } from "../../util/Util";

function PaymentItem(props) {
  const payment = props.payment;
  const [showDetails, setShowDetils] = useState(false);

  // MODAL SHOW AND HIDE FUNCTIONS
  const showModalHandler = () => setShowDetils(true);
  return (
    <>
      <li
        key={payment.id}
        className="grid grid-cols-[1fr_3fr_1fr] border-b border-b-slate-200 border-spacing-1 mb-2 relative transaction-list"
      >
        <span>{formatMonthDay(payment.date)}</span>
        <span className="capitalize">{payment.payment_for}</span>
        <span className="justify-self-end">{numberFormat(payment.amount)}</span>
        <div className="absolute top-0 right-0 action-icons">
          {/** SHOW ADDIDTIONAL DETAILS BUTTON IF HAVE ADDITIONAL DETAILS */}
          {payment.additional_details && (
            <button className="px-2 py-1 bg-blue-500" onClick={showModalHandler}>
              <BsEye color="white" />
            </button>
          )}
          <button className="px-2 py-1 bg-yellow-500" onClick={props.onEdit ? props.onEdit.bind(this, payment) : undefined}>
            <BsPencil color="white" />
          </button>
          <button className="px-2 py-1 bg-red-500 " onClick={props.onDelete ? props.onDelete.bind(this, payment.id) : undefined}>
            <BsTrash color="white" />
          </button>
        </div>
      </li>
      {/** SHOW ADDITIONAL DETAILS MODAL */}
      {showDetails && <AdditionalDetailModal payment={payment} showModal={showDetails} setShow={setShowDetils} />}
    </>
  );
}

export default PaymentItem;
