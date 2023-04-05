function PaymentItems(props) {
  const payments = props.payments;

  return (
    <div>
      <p className="font-medium text-slate-800">General Payments</p>
      {payments && payments.length > 0 && (
        <div className="bg-lightestBlue px-4 py-4 mt-2">
          <ul className="text-sm font-medium">
            {payments &&
              payments.map((payment) => {
                return (
                  <li key={payment.id} className="flex justify-between border-b border-b-slate-200 border-spacing-1 mb-2">
                    <span>{payment.date}</span>
                    <span>{payment.payment_for}</span>
                    <span>{payment.amount}</span>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PaymentItems;
