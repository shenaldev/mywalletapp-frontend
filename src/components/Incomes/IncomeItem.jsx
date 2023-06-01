import { useState } from "react";
//IMPORT UTILS
import { formatMonthDay } from "../../util/Dates";
import { numberFormat, textFormat } from "../../util/Util";
//IMPORT COMPONENTS
import AdditionalDetailsModal from "./AdditionalDetailsModal";
import ActionButtons from "./ActionButtons";

function IncomeItem(props) {
  const income = props.income;
  const [showDetails, setShowDetils] = useState(false);

  // MODAL SHOW AND HIDE FUNCTIONS
  const showModalHandler = () => setShowDetils(true);

  return (
    <>
      <li
        key={income.id}
        className="grid grid-cols-[1fr_3fr_1fr] border-b border-b-slate-200 border-spacing-2 mb-2 relative transaction-list"
      >
        <span>{formatMonthDay(income.date)}</span>
        <span className="capitalize">{textFormat(income.from)}</span>
        <span className="justify-self-end">{numberFormat(income.value)}</span>
        <div className="absolute top-0 right-0 action-icons">
          <ActionButtons showModalHandler={showModalHandler} income={income} onEdit={props.onEdit} onDelete={props.onDelete} />
        </div>
      </li>
      {/** SHOW ADDITIONAL DETAILS MODAL */}
      {showDetails && <AdditionalDetailsModal income={income} showModal={showDetails} setShow={setShowDetils} />}
    </>
  );
}

export default IncomeItem;
