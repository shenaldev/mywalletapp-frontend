import { formatMonthDay } from "../../util/Dates";
import { numberFormat } from "../../util/Util";
//IMPORT ICONS
import { BsPencil, BsTrash } from "react-icons/bs";

function IncomeItem(props) {
  const income = props.income;

  return (
    <li
      key={income.id}
      className="flex justify-between border-b border-b-slate-200 border-spacing-2 mb-2 relative transaction-list"
    >
      <span>{formatMonthDay(income.date)}</span>
      <span className="capitalize">{income.from}</span>
      <span>{numberFormat(income.value)}</span>
      <div className="absolute top-0 right-0 action-icons">
        <button className="px-2 py-1 bg-yellow-500 ">
          <BsPencil color="white" />
        </button>
        <button className="px-2 py-1 bg-red-500 " onClick={props.onDelete ? props.onDelete.bind(this, income.id) : undefined}>
          <BsTrash color="white" />
        </button>
      </div>
    </li>
  );
}

export default IncomeItem;
