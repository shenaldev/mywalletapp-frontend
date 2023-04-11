import { useState } from "react";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
//IMPORT UTILLS
import { numberFormat } from "../../util/Util";
//IMPORT COMPONENTS
import PaymentItem from "./PaymentItem";

function CategoryItem(props) {
  const category = props.category;
  const payments = props.items;
  const totals = props.totals;
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
          {totals &&
            totals.map((total) => {
              return total.category_id == category.id && numberFormat(total.total);
            })}
          {/** OUTPUT 0 IF TOTAL NOT EXISTS */}
          {totals && totals.length <= 0 && "0.00"}
          {/** OUTPUT EXPAND BUTTON IF ANY TRANACTION EXISTS */}
          {totals &&
            totals.map((total) => {
              return (
                total.category_id == category.id && (
                  <button key={Math.random() * 1} className="flex gap-2 items-center" onClick={expandClickHandler}>
                    {expand ? <BsCaretUpFill color="red" /> : <BsCaretDownFill color="green" />}
                  </button>
                )
              );
            })}
        </span>
      </div>
      {expand && payments && payments[category.id] && (
        <div className="bg-lightestBlue px-4 py-4 mt-2">
          <ul className="text-sm font-medium">
            {payments[category.id] &&
              payments[category.id].map((payment) => {
                return <PaymentItem key={payment.id} payment={payment} onDelete={props.onDelete} />;
              })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CategoryItem;
