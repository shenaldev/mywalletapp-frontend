import { Modal, ModalContent } from "../UI/Modal";
import { DialogTitle } from "@radix-ui/react-dialog";
//IMPORT UTILS
import { numberFormat } from "../../util/Util";

function AdditionalDetailsModal(props) {
  const income = props.income;

  return (
    <Modal open={props.showModal} onOpenChange={props.setShow}>
      <ModalContent>
        <DialogTitle className="mb-4 border-b border-b-slate-200 border-spacing-3">Income Details</DialogTitle>
        <div className="mt-6 text-slate-900">
          <table className="w-full">
            <tbody>
              <tr>
                <td>Income From</td>
                <td className="px-4">:</td>
                <td>{income.from}</td>
              </tr>
              <tr>
                <td>Amount</td>
                <td className="px-4">:</td>
                <td>{numberFormat(income.value)}</td>
              </tr>
              <tr>
                <td>Date</td>
                <td className="px-4">:</td>
                <td>{income.date}</td>
              </tr>
            </tbody>
          </table>
          {income.additional_details && <p className="mt-3">Additional Details : {income.additional_details.details}</p>}
        </div>
      </ModalContent>
    </Modal>
  );
}

export default AdditionalDetailsModal;
