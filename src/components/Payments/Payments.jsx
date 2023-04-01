import { useEffect, useState } from "react";
// IMPORT COMPONENTS
import Card from "../UI/Card";
import CardHeader from "../UI/CardHeader";
import AddPayment from "./AddPayment";
//IMPORT UTILS
import apiClient, { webClient } from "../../util/Axios";

function Payments() {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);

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
      </Card>
      {showModal && <AddPayment modalHide={hideModalHandler} categories={categories} />}
    </>
  );
}

export default Payments;
