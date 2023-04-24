import { numberFormat } from "../../util/Util";
import ModalHeader from "../Common/ModalHeader";
import Card from "../UI/Card";
import Modal from "../UI/Modal";

function AdditionalDetailModal(props) {
  const payment = props.payment;

  return (
    <Modal>
      <Card className="max-w-xs max-h-[90vh] md:min-w-[28rem] md:max-w-md overflow-y-auto">
        <ModalHeader title="Payment Details" closeButtonClick={props.hideModalHandler} />
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
  );
}

export default AdditionalDetailModal;
