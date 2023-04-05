import { useState, useEffect } from "react";
//IMPORT COMPONENTS
import Card from "../UI/Card";
import CardHeader from "../UI/CardHeader";
import AddIncome from "./AddIncome";
import IncomeItem from "./IncomeItem";
//IMPORT UTILS
import apiClient from "../../util/Axios";
import SumOfTotal from "../Common/SumOfTotal";
import Spinner from "../UI/Spinner";

function Incomes(props) {
  const currentYear = props.year;
  const currentMonth = props.month;
  const [showModal, setShowModal] = useState(false);
  const [incomes, setIncomes] = useState(null);
  const [sum, setSum] = useState(null); // Total Sum Of Incomes
  const [isFetching, setIsFetching] = useState(false);
  const [newIncome, setNewIncome] = useState(0); // Increase by 1 to fetch data again useefect

  /**
   * Handle modal show and hide
   * onAddButtonCLick in CardHeader component execute showAddModelHandler()
   * onHideButtonClick in AddPayment Component execute hideModalHanlder
   */
  const showAddModalHanlder = () => setShowModal(true);
  const hideModalHandler = () => setShowModal(false);

  /**
   * Get all incomes
   */
  useEffect(() => {
    setIsFetching(true);
    let monthNumber = currentMonth + 1;
    apiClient
      .get("/incomes/" + currentYear + "/" + monthNumber)
      .then((response) => {
        setIsFetching(false);
        setIncomes(response.data.incomes);
        setSum(response.data.incomes_sum);
      })
      .catch((error) => {
        setIsFetching(false);
        console.log("Income Component: ", error);
      });
  }, [currentYear, currentMonth, newIncome]);

  /**
   * On new income is added increase newIncome value by one
   * It will execute useefect and load new data
   */
  function newIncomeHandler() {
    setNewIncome((income) => (income = income + 1));
  }

  return (
    <>
      <Card>
        <CardHeader title="Incomes" addButtonClick={showAddModalHanlder} />
        {isFetching && <div className="flex items-center justify-center">{isFetching && <Spinner />}</div>}
        {!isFetching && (
          <ul className="mx-4 mt-4 font-medium text-sm">
            {incomes &&
              incomes.map((income) => {
                return <IncomeItem key={income.id} income={income} />;
              })}
          </ul>
        )}
        {/** OUTPUT SUM OF TOTAL */}
        {!isFetching && <SumOfTotal sum={sum} className="text-green-600 border-b-slate-600" />}
      </Card>
      {showModal && <AddIncome modalHide={hideModalHandler} onAdd={newIncomeHandler} />}
    </>
  );
}

export default Incomes;
