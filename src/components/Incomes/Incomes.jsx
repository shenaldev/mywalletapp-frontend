import { useState } from "react";
//IMPORT COMPONENTS
import Card from "../UI/Card";
import CardHeader from "../UI/CardHeader";
import AddIncome from "./AddIncome";

function Incomes() {
  const [showModal, setShowModal] = useState(false);
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
      </Card>
      {showModal && <AddIncome modalHide={hideModalHandler} />}
    </>
  );
}

export default Incomes;
