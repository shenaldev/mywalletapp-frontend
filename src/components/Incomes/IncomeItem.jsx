function IncomeItem(props) {
  const income = props.income;
  return (
    <li key={income.id} className="flex justify-between border-b border-b-slate-200 border-spacing-1 mb-2">
      <span>{income.date}</span>
      <span>{income.from}</span>
      <span>{income.value}</span>
    </li>
  );
}

export default IncomeItem;
