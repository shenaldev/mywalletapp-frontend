import { useEffect, useState } from "react";
// IMPORT COMPONENTS
import Card from "../UI/Card";
import CardHeader from "../UI/CardHeader";
import AddPayment from "./AddPayment";
import CategoryItem from "./CategoryItem";
import GeneralList from "./GeneralList";
import Spinner from "../UI/Spinner";
import SumOfTotal from "../Common/SumOfTotal";
//IMPORT UTILS
import apiClient, { webClient } from "../../util/Axios";

function Payments(props) {
  const currentYear = props.year;
  const currentMonth = props.month;
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [payments, setPayments] = useState(null);
  const [totals, setTotals] = useState(null); //Total Amount By Category
  const [sum, setSum] = useState(null); // Total Sum Of Payments
  const [generalPayments, setGeneralPayments] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [newPayment, setNewPayment] = useState(0);

  // MODAL SHOW AND HIDE FUNCTIONS
  const showAddModalHanlder = () => setShowModal(true);
  const hideModalHandler = () => setShowModal(false);

  //GET ALL PAYMENT CATEGORIES FROM DB AND PASS IT TO ADDPAYMENT COMPONENT
  useEffect(() => {
    webClient.get("sanctum/csrf-cookie");
    apiClient.get("/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

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
        setSum(response.data.payments_sum);
      })
      .catch((error) => {
        setIsFetching(false);
        console.log(error);
      });
  }, [currentYear, currentMonth, newPayment]);

  /**
   * On new payment is added increase newPayment value by one
   * It will execute useefect and load new data
   */
  function newPaymentHandler() {
    setNewPayment((payment) => (payment = payment + 1));
  }

  return (
    <>
      <Card>
        <CardHeader title="Payments" addButtonClick={showAddModalHanlder} />
        {/** SHOW FETCHING SPINNER */}
        {isFetching && <div className="flex items-center justify-center">{isFetching && <Spinner />}</div>}
        {/** IF FETCHED OUTPUT PAYMENTS */}
        {!isFetching &&
          categories.map((category) => {
            return (
              category.id != 1 && ( // PREVENT OUTPUTING PRIMARY CATEGORY ON LIST
                <CategoryItem
                  key={category.id}
                  category={category}
                  items={payments}
                  totals={
                    totals &&
                    totals.filter((total) => {
                      return total.category_id == category.id;
                    })
                  }
                />
              )
            );
          })}
        {/*** OUTPUT ALL GENERAL PAYMENTS*/}
        {!isFetching && generalPayments && <GeneralList payments={generalPayments} />}
        {/** OUTPUT SUM OF TOTAL */}
        {!isFetching && <SumOfTotal sum={sum} className="text-red-600 border-b-slate-600" />}
      </Card>
      {/** ADD PAYMENT MODAL ON ADD BUTTON CLICK */}
      {showModal && <AddPayment modalHide={hideModalHandler} categories={categories} onAdd={newPaymentHandler} />}
    </>
  );
}

export default Payments;
