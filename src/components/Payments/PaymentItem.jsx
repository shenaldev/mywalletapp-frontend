import { useState } from "react";
//IMPORT COMPONENTS
import AdditionalDetailModal from "./AdditionalDetailsModal";
import ActionButtons from "../Payments/ActionButtons";
//IMPORT UTILS
import { formatMonthDay } from "../../util/Dates";
import { numberFormat, textFormat } from "../../util/Util";

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
        <span className="capitalize">{textFormat(payment.payment_for)}</span>
        <span className="justify-self-end">{numberFormat(payment.amount)}</span>
        <div className="absolute top-0 right-0 action-icons">
          <ActionButtons showModalHandler={showModalHandler} payment={payment} onEdit={props.onEdit} onDelete={props.onDelete} />
        </div>
      </li>
      {/** SHOW ADDITIONAL DETAILS MODAL */}
      {showDetails && <AdditionalDetailModal payment={payment} showModal={showDetails} setShow={setShowDetils} />}
    </>
  );
}

export default PaymentItem;
