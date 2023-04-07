import { formatMonthDay } from "../../util/Dates";
import { numberFormat } from "../../util/Util";

function IncomeItem(props) {
  const income = props.income;

  return (
    <li key={income.id} className="flex justify-between border-b border-b-slate-200 border-spacing-2 mb-2">
      <span>{formatMonthDay(income.date)}</span>
      <span className="capitalize">{income.from}</span>
      <span>{numberFormat(income.value)}</span>
    </li>
  );
}

export default IncomeItem;
