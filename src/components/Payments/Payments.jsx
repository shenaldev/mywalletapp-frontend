import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// IMPORT COMPONENTS
import Card from "../UI/Card";
import CardHeader from "../UI/CardHeader";
import AddPayment from "./AddPayment";
import CategoryItem from "./CategoryItem";
import Spinner from "../UI/Spinner";
import SumOfTotal from "../Common/SumOfTotal";
import EditPayment from "./EditPayment";
//IMPORT UTILS
import apiClient, { webClient } from "../../util/Axios";
import { toastifyConfig } from "../../util/Util";
import {
  getCategoryID,
  getCategorySlug,
  getNewPayments,
  getNewPaymentsOnUpdate,
  getNewTotals,
  getNewTotalsOnDelete,
  getNewTotalsOnUpdate,
} from "../../util/Payments";

function Payments(props) {
  const currentYear = props.year;
  const currentMonth = props.month;
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [payments, setPayments] = useState(null);
  const [totals, setTotals] = useState(null); //Total Amount By Category
  const [sum, setSum] = useState(null); // Total Sum Of Payments
  const [isFetching, setIsFetching] = useState(false);
  const [editPayment, setEditPayment] = useState(null); //Payment Object To Edit Modal

  // MODAL SHOW AND HIDE FUNCTIONS
  const showAddModalHanlder = () => setShowAddModal(true);
  const hideAddModalHandler = () => setShowAddModal(false);

  //EDIT MODAL SHOW AND HIDE FUNCTIONS
  const showEditModalHanlder = () => setShowEditModal(true);
  const hideEditModalHandler = () => setShowEditModal(false);

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
        navigate("/error");
      });
  }, [currentYear, currentMonth]);

  /**
   * UPDATE PAYMENTS OBJECT (useState) WHEN NEW PAYMENT HAS BEEN ADDED
   * Update Totals Payment Categories
   * Update Sum Of Totals
   * @param payment = Newly added payment object
   */
  function newPaymentHandler(payment) {
    //CHECK IF PAYMENT IS IN CURRENT MONTH AND YEAR
    const paymentDate = new Date(payment.date);
    if (paymentDate.getMonth() != currentMonth || paymentDate.getFullYear() != currentYear) {
      return;
    }
    //GET CATEGORY SLUG OF NEWLY ADDED PAYMENT
    const categorySlug = getCategorySlug(categories, payment.category_id);

    //UPDATE PAYMENTS OBJECT
    setPayments((payments) => {
      const newPayments = getNewPayments(payments, payment, categorySlug);
      return newPayments;
    });

    //UPDATE TOTALS VALUE ON ADD NEW PAYMENT
    setTotals((prevState) => {
      const newTotals = getNewTotals(prevState, payment, categorySlug);
      return newTotals;
    });

    //UPDATE SUM OF TOTALS
    setSum((prevState) => {
      return (parseFloat(prevState) + parseFloat(payment.amount)).toFixed(2);
    });
  }

  /**
   * Delete Payment From Payments Object on Payment Delete
   * Update Payments Totals
   * Update Sum Of Total
   * @param {*} payment Deleted Payment
   */
  function onPaymentDelete(payment) {
    const categorySlug = getCategorySlug(categories, payment.category_id);
    const categoryID = getCategoryID(categories, payment.category_id);

    //UPDATE PAYMENTS OBJECT
    setPayments((payments) => {
      return {
        ...payments,
        [categorySlug]: payments[categorySlug].filter((item) => {
          return item.id != payment.id;
        }),
      };
    });
    // UPDATE TOTALS OBJECT
    setTotals((prevState) => {
      const newTotals = getNewTotalsOnDelete(prevState, categoryID, payment.amount);
      return newTotals;
    });
    //UPDATE SUM OF TOTALS
    setSum((prevState) => {
      return (parseFloat(prevState) - parseFloat(payment.amount)).toFixed(2);
    });
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
          if (response.data.success == true) {
            onPaymentDelete(response.data.payment);
          }
        })
        .catch((error) => {
          console.log("Payments deletePaymentHandler() :", error);
          toast.error("Somethings Wrong!", toastifyConfig);
        });
    }
  }

  /**
   * SHOW EDIT PAYMENT MODAL WITH OLD PAYMENT DATA
   * @param {*} payment old payment object
   */
  function editPaymentHandler(payment) {
    setEditPayment(payment);
    showEditModalHanlder();
  }

  /**
   * UPDATE PAYMENTS OBJECT (useState) WHEN PAYMENT HAS BEEN UPDATED
   * @param {*} payment Updated Payment Object
   * @param {*} oldCost Old Payment Cost
   */
  function onPaymentUpdate(updatedPayment, oldPayment) {
    const categorySlug = getCategorySlug(categories, updatedPayment.category_id);

    //UPDATE PAYMENTS OBJECT
    setPayments((prevState) => {
      const newPayments = getNewPaymentsOnUpdate(prevState, updatedPayment, oldPayment, categories, categorySlug);
      return newPayments;
    });

    //UPDATE TOTALS VALUE ON UPDATE
    setTotals((prevState) => {
      const newTotals = getNewTotalsOnUpdate(prevState, updatedPayment, oldPayment, categories, categorySlug);
      return newTotals;
    });

    //UPDATE SUM OF TOTALS
    setSum((prevState) => {
      const calSum = parseFloat(prevState) - parseFloat(oldPayment.amount);
      const newSum = parseFloat(calSum) + parseFloat(updatedPayment.amount);
      return newSum;
    });
  }

  return (
    <>
      <Card className={props.className ? props.className : "hidden md:block"}>
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
                onEdit={editPaymentHandler}
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
      {/** SHOW PAYMENT MODAL ON ADD BUTTON CLICK */}
      {showAddModal && (
        <AddPayment
          categories={categories}
          onAdd={newPaymentHandler}
          showModal={showAddModal}
          hideModal={hideAddModalHandler}
          setShow={setShowAddModal}
        />
      )}
      {/** SHOW EDIT PAYMENT MODAL ON EDIT BUTTON CLICK */}
      {showEditModal && (
        <EditPayment
          categories={categories}
          payment={editPayment}
          onUpdate={onPaymentUpdate}
          showModal={showEditModal}
          hideModal={hideEditModalHandler}
          setShow={setShowEditModal}
        />
      )}
    </>
  );
}

export default Payments;
