import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
//IMPORT COMPONENTS
import Incomes from "../Incomes/Incomes";
import Payments from "../Payments/Payments";
import Modal from "../UI/Modal";
import Spinner from "../UI/Spinner";
//IMPORT UTILLS
import apiClient from "../../util/Axios";

function Dashboard() {
  const [currentMonth, currentYear] = useOutletContext();
  const [incomes, setIncomes] = useState(null);
  const [payments, setPayments] = useState(null);
  const [totals, setTotals] = useState(null); //Total Amount By Category
  const [paymentsSum, setPaymentsSum] = useState(null); // Total Sum Of Payments
  const [incomesSum, setIncomesSum] = useState(null); // Total Sum Of Incomes
  const [generalPayments, setGeneralPayments] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  /**
   * GET ALL PAYMENTS
   */
  useEffect(() => {
    setIsFetching(true);
    let monthNumber = currentMonth + 1;
    apiClient
      .get("/payments/" + currentYear + "/" + monthNumber)
      .then((response) => {
        setIsFetching(false);
        setPayments(response.data.payments);
        setGeneralPayments(response.data.general);
        setTotals(response.data.totals);
        setPaymentsSum(response.data.payments_sum);
      })
      .catch((error) => {
        setIsFetching(false);
        console.log(error);
      });
  }, [currentYear, currentMonth]);

  /**
   * GET ALL INCOMES
   */
  useEffect(() => {
    setIsFetching(true);
    let monthNumber = currentMonth + 1;
    apiClient
      .get("/incomes/" + currentYear + "/" + monthNumber)
      .then((response) => {
        setIsFetching(false);
        setIncomes(response.data.incomes);
        setIncomesSum(response.data.incomes_sum);
      })
      .catch((error) => {
        setIsFetching(false);
        console.log(error);
      });
  }, [currentYear, currentMonth]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mt-12">
        <Payments payments={payments} totals={totals} generalPayments={generalPayments} sum={paymentsSum} />
        <Incomes incomes={incomes} sum={incomesSum} />
      </div>
      {isFetching && (
        <Modal>
          <Spinner />
        </Modal>
      )}
    </>
  );
}

export default Dashboard;
