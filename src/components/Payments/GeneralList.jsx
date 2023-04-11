import PaymentItem from "./PaymentItem";

function GeneralList(props) {
  const payments = props.payments;

  return (
    <div>
      <p className="font-medium text-slate-800">General Payments</p>
      {payments && payments.length > 0 && (
        <div className="bg-lightestBlue px-4 py-4 mt-2">
          <ul className="text-sm font-medium">
            {payments &&
              payments.map((payment) => {
                return <PaymentItem key={payment.id} payment={payment} onDelete={props.onDelete} />;
              })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GeneralList;
