function TransactionItem(props) {
  const payment = props.payment;

  return (
    <li key={payment.id} className="flex justify-between border-b border-b-slate-200 border-spacing-1 mb-2">
      <span>{formatMonthDay(payment.date)}</span>
      <span>{payment.payment_for}</span>
      <span>{numberFormat(payment.amount)}</span>
    </li>
  );
}

export default TransactionItem;
