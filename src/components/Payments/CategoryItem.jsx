import { useState } from "react";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";

function CategoryItem(props) {
  const category = props.category;
  const payments = props.items;
  const total = props.total;
  const [expand, setExpand] = useState(false);

  function expandClickHandler() {
    setExpand((expand) => (expand = !expand));
  }

  return (
    <div className="mb-2">
      <div className="flex justify-between font-medium text-slate-800">
        <p>{category.name}</p>
        <span className="flex gap-2 items-center">
          {/** OUTPUT TOTAL AMOUNT BY CATEGORY */}
          {total &&
            Object.values(total).map((total) => {
              return total != undefined ? total.total : 0;
            })}
          {total && total.length < 1 && "0.00"}
          {total && total.length > 0 && (
            <button className="flex gap-2 items-center" onClick={expandClickHandler}>
              {expand ? <BsCaretUpFill color="red" /> : <BsCaretDownFill color="green" />}
            </button>
          )}
        </span>
      </div>
      {expand && payments && payments[category.id] && (
        <div className="bg-lightestBlue px-4 py-4 mt-2">
          <ul className="text-sm font-medium">
            {payments[category.id] &&
              payments[category.id].map((payment) => {
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

export default CategoryItem;
