import { formatMonthDay } from "../../util/Dates";
import { numberFormat } from "../../util/Util";
//IMPORT ICONS
import { BsPencil, BsTrash } from "react-icons/bs";

function PaymentItem(props) {
  const payment = props.payment;
  return (
    <li
      key={payment.id}
      className="flex justify-between border-b border-b-slate-200 border-spacing-1 mb-2 relative transaction-list"
    >
      <span>{formatMonthDay(payment.date)}</span>
      <span className="capitalize">{payment.payment_for}</span>
      <span>{numberFormat(payment.amount)}</span>
      <div className="absolute top-0 right-0 action-icons">
        <button className="px-2 py-1 bg-yellow-500 ">
          <BsPencil color="white" />
        </button>
        <button className="px-2 py-1 bg-red-500 " onClick={props.onDelete ? props.onDelete.bind(this, payment.id) : undefined}>
          <BsTrash color="white" />
        </button>
      </div>
    </li>
  );
}

export default PaymentItem;
