import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
import { toastifyConfig } from "../../util/Util";

function Payments(props) {
  const currentYear = props.year;
  const currentMonth = props.month;
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [payments, setPayments] = useState(null);
  const [totals, setTotals] = useState(null); //Total Amount By Category
  const [sum, setSum] = useState(null); // Total Sum Of Payments
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
        setTotals(response.data.totals);
        setSum(response.data.payments_sum);
      })
      .catch((error) => {
        setIsFetching(false);
        console.log("Payments Line 56: ", error);
      });
  }, [currentYear, currentMonth, newPayment]);

  /**
   * On new payment is added increase newPayment value by one
   * It will execute useefect and load new data
   */
  function newPaymentHandler(payment) {
    //setNewPayment((payment) => (payment = payment + 1));
    const category = categories.filter((category) => {
      return category.id == payment.category_id;
    });
    const categorySlug = category[0].slug;

    setPayments((payments) => ({
      ...payments,
      [categorySlug]: [
        ...payments[categorySlug],
        {
          id: payment.id,
          payment_for: payment.payment_for,
          amount: payment.amount,
          date: payment.date,
          category_id: payment.category_id,
          category: {
            category_id: payment.category_id,
            slug: categorySlug,
          },
        },
      ],
    }));
  }

  /**
   * Delete Payment Function
   */
  function deletePaymentHandler(id) {
    const deleteConfirm = window.confirm("Do you want to delete payment ?");
    if (deleteConfirm) {
      apiClient
        .delete("/payment/" + id)
        .then((response) => {
          toast.warn("Payment Has Deleted", toastifyConfig);
          //newPaymentHandler();
        })
        .catch((error) => {
          console.log("Payments 81 Line:", error);
          toast.error("Somethings Wrong!", toastifyConfig);
        });
    }
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
              <CategoryItem
                key={category.id}
                category={category}
                items={payments}
                onDelete={deletePaymentHandler}
                totals={
                  totals &&
                  totals.filter((total) => {
                    return total.category_id == category.id;
                  })
                }
              />
            );
          })}
        {/** OUTPUT SUM OF TOTAL */}
        {!isFetching && <SumOfTotal sum={sum} className="text-red-600 border-b-slate-600" />}
      </Card>
      {/** ADD PAYMENT MODAL ON ADD BUTTON CLICK */}
      {showModal && <AddPayment modalHide={hideModalHandler} categories={categories} onAdd={newPaymentHandler} />}
    </>
  );
}

export default Payments;
