import { useEffect, useState } from "react";
import { toast } from "react-toastify";
// IMPORT COMPONENTS
import Card from "../UI/Card";
import CardHeader from "../UI/CardHeader";
import AddPayment from "./AddPayment";
import CategoryItem from "./CategoryItem";
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
  }, [currentYear, currentMonth]);

  /**
   * UPDATE PAYMENTS OBJECT (useState) WHEN NEW PAYMENT HAS BEEN ADDED
   * Update Totals Payment Categories
   * Update Sum Of Totals
   * @param payment = Newly added payment object
   */
  function newPaymentHandler(payment) {
    //Get category of newly added payment
    const category = categories.filter((category) => {
      return category.id == payment.category_id;
    });
    const categorySlug = category[0].slug;

    //UPDATE PAYMENTS OBJECT
    setPayments((payments) => {
      if (payments[categorySlug]) {
        return { ...payments, [categorySlug]: [...payments[categorySlug], payment] };
      }
      const newPayments = { ...payments, [categorySlug]: [payment] };
      return newPayments;
    });
    //UPDATE TOTALS VALUE ON ADD NEW PAYMENT
    setTotals((prevState) => {
      //CHECK IS TOTAL CATEGORY IS IN TOTALS ARRAY IF NOT ADD IT ELSE UPDATE
      const isCategoryInTotals = totals.some((t) => t.slug == categorySlug);
      let newTotals = null;
      if (isCategoryInTotals) {
        newTotals = prevState.map((total) => {
          if (total.slug == categorySlug) {
            const ntotal = (parseFloat(total.total) - parseFloat(payment.amount)).toFixed(2);
            return { ...total, total: ntotal.toString() };
          }
          return total;
        });
      } else {
        newTotals = [...prevState, { category_id: payment.category_id, slug: categorySlug, total: payment.amount }];
      }
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
    const category = categories.filter((category) => {
      return category.id == payment.category_id;
    });
    const categorySlug = category[0].slug;
    const categoryID = category[0].id;

    //UPDATE PAYMENTS OBJECT
    setPayments((payments) => {
      return {
        ...payments,
        [categorySlug]: payments[categorySlug].filter((item) => {
          return item.id != payment.id;
        }),
      };
    });
    //UPDATE TOTALS VALUE ON DELETE
    setTotals((prevState) => {
      const newTotals = prevState.map((total) => {
        if (total.category_id == categoryID) {
          const newTotal = (parseFloat(total.total) - parseFloat(payment.amount)).toFixed(2);
          return { ...total, total: newTotal.toString() };
        }
        return total;
      });
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
