import { useState } from "react";
//IMPORT COMPONENTS
import Modal from "../UI/Modal";
import Card from "../UI/Card";
import ModalHeader from "../Common/ModalHeader";
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
  const hideModalHandler = () => setShowDetils(false);

  return (
    <>
      <li
        key={payment.id}
        className="flex justify-between border-b border-b-slate-200 border-spacing-1 mb-2 relative transaction-list"
      >
        <span>{formatMonthDay(payment.date)}</span>
        <span className="capitalize">{payment.payment_for}</span>
        <span>{numberFormat(payment.amount)}</span>
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
      {showDetails && (
        <Modal>
          <Card className="max-w-xs max-h-[90vh] md:min-w-[28rem] md:max-w-md overflow-y-auto">
            <ModalHeader title="Payment Details" closeButtonClick={hideModalHandler} />
            <div className="mt-6 text-slate-900">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td>Payment For</td>
                    <td className="px-4">:</td>
                    <td>{payment.payment_for}</td>
                  </tr>
                  <tr>
                    <td>Amount</td>
                    <td className="px-4">:</td>
                    <td>{numberFormat(payment.amount)}</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td className="px-4">:</td>
                    <td>{payment.date}</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3">Additional Details : {payment.additional_details.details}</p>
            </div>
          </Card>
        </Modal>
      )}
      {/** SHOW ADDITIONAL DETAILS MODAL END*/}
    </>
  );
}

export default PaymentItem;
