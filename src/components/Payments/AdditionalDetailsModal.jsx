import { DialogTitle } from "@radix-ui/react-dialog";
import { Modal, ModalContent } from "../UI/Modal";
//IMPORT UTIL
import { numberFormat } from "../../util/Util";

function AdditionalDetailModal(props) {
  const payment = props.payment;

  return (
    <Modal open={props.showModal} onOpenChange={props.setShow}>
      <ModalContent>
        <DialogTitle className="mb-4 border-b border-b-slate-200 border-spacing-3">Payment Details</DialogTitle>
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
      </ModalContent>
    </Modal>
  );
}

export default AdditionalDetailModal;
