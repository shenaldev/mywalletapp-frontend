import { useState } from "react";
//IMPORT COMPONENTS
import Card from "../UI/Card";
import CardHeader from "../UI/CardHeader";
import AddIncome from "./AddIncome";
import IncomeItem from "./IncomeItem";

function Incomes(props) {
  const [showModal, setShowModal] = useState(false);
  const incomes = props.incomes;
  const sum = props.sum;

  /**
   * Handle modal show and hide
   * onAddButtonCLick in CardHeader component execute showAddModelHandler()
   * onHideButtonClick in AddPayment Component execute hideModalHanlder
   */
  const showAddModalHanlder = () => setShowModal(true);
  const hideModalHandler = () => setShowModal(false);

  return (
    <>
      <Card>
        <CardHeader title="Incomes" addButtonClick={showAddModalHanlder} />
        <ul className="mx-4 mt-4 font-medium text-sm">
          {incomes &&
            incomes.map((income) => {
              return <IncomeItem key={income.id} income={income} />;
            })}
        </ul>
        {/** OUTPUT SUM OF TOTAL */}
        <div className="flex justify-end mt-8">
          {sum && <p className="text-green-600 font-semibold border-b border-b-slate-700 ">Total = {sum}</p>}
        </div>
      </Card>
      {showModal && <AddIncome modalHide={hideModalHandler} />}
    </>
  );
}

export default Incomes;
