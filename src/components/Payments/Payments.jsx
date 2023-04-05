import { useEffect, useState } from "react";
// IMPORT COMPONENTS
import Card from "../UI/Card";
import CardHeader from "../UI/CardHeader";
import AddPayment from "./AddPayment";
//IMPORT UTILS
import apiClient, { webClient } from "../../util/Axios";
import CategoryItem from "./CategoryItem";
import PaymentItems from "./PaymentItems";

function Payments(props) {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const payments = props.payments;
  const generalPayments = props.generalPayments;
  const totals = props.totals; // Total Amount By Categories

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

  return (
    <>
      <Card>
        <CardHeader title="Payments" addButtonClick={showAddModalHanlder} />
        {categories.map((category) => {
          {
            return (
              category.id != 1 && ( // PREVENT OUTPUTING PRIMARY CATEGORY ON LIST
                <CategoryItem
                  key={category.id}
                  category={category}
                  items={payments}
                  total={
                    totals &&
                    totals.filter((total) => {
                      return total.category_id == category.id; // FILTER TOTAL BY CATEGORY ID
                    })
                  }
                />
              )
            );
          }
        })}
        {/**
         * OUTPUT ALL GENERAL PAYMENTS
         */}
        {generalPayments && <PaymentItems payments={generalPayments} />}
        {/** OUTPUT SUM OF TOTAL */}
        <div className="flex justify-end mt-8">
          {props.sum && <p className="text-red-600 font-semibold border-b border-b-slate-700 ">Total = {props.sum}</p>}
        </div>
      </Card>
      {showModal && <AddPayment modalHide={hideModalHandler} categories={categories} onNewPayment={props.onNewPayment} />}
    </>
  );
}

export default Payments;
