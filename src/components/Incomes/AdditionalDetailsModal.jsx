import ModalHeader from "../Common/ModalHeader";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
//IMPORT UTILS
import { numberFormat } from "../../util/Util";

function AdditionalDetailsModal(props) {
  const income = props.income;

  return (
    <Modal>
      <Card className="max-w-xs max-h-[90vh] md:min-w-[28rem] md:max-w-md overflow-y-auto">
        <ModalHeader title="Income Details" closeButtonClick={props.hideModalHandler} />
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
          <p className="mt-3">Additional Details : {income.additional_details.details}</p>
        </div>
      </Card>
    </Modal>
  );
}

export default AdditionalDetailsModal;
