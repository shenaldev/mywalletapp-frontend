import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
//IMPORT COMPONENTS
import Card from "../UI/Card";
import CardHeader from "../UI/CardHeader";
import AddIncome from "./AddIncome";
import IncomeItem from "./IncomeItem";
import Spinner from "../UI/Spinner";
import SumOfTotal from "../Common/SumOfTotal";
import EditIncome from "./EditIncome";
//IMPORT UTILS
import apiClient from "../../util/Axios";
import { toastifyConfig } from "../../util/Util";

function Incomes(props) {
  const currentYear = props.year;
  const currentMonth = props.month;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [incomes, setIncomes] = useState(null);
  const [sum, setSum] = useState(null); // Total Sum Of Incomes
  const [isFetching, setIsFetching] = useState(false);
  const [editIncome, setEditIncome] = useState(null); //Income Object for Edit Modal

  // MODAL SHOW AND HIDE FUNCTIONS
  const showAddModalHanlder = () => setShowModal(true);
  const hideModalHandler = () => setShowModal(false);

  //EDIT MODAL SHOW AND HIDE FUNCTIONS
  const showEditModalHanlder = () => setShowEditModal(true);
  const hideEditModalHandler = () => setShowEditModal(false);

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
        setSum(response.data.incomes_sum);
      })
      .catch((error) => {
        setIsFetching(false);
        console.log("Income Component: ", error);
        navigate("/error");
      });
  }, [currentYear, currentMonth]);

  /**
   * ADD NEW INCOME HANDLER UPDATE INCOMES STATE
   * @param {*} income New Income Object
   */
  function newIncomeHandler(income) {
    //CHECK IF PAYMENT IS IN CURRENT MONTH AND YEAR
    const incomeDate = new Date(income.date);
    if (incomeDate.getMonth() != currentMonth || incomeDate.getFullYear() != currentYear) {
      return;
    }

    setIncomes((prevState) => {
      return [
        ...prevState,
        {
          id: income.id,
          from: income.from,
          value: income.value,
          date: income.date,
          additional_details: income.additional_details,
        },
      ];
    });
    setSum((prevState) => {
      return parseFloat(prevState) + parseFloat(income.value);
    });
  }

  //DELETE INCOME HANDLER UPDATE INCOMES STATE
  function onDeleteHandler(income) {
    setIncomes((prevState) => {
      return prevState.filter((item) => {
        return item.id != income.id;
      });
    });
    setSum((prevState) => {
      return parseFloat(prevState) - parseFloat(income.value);
    });
  }

  /**
   * DELETE INCOME FROM DATABASE
   * @param {*} id Income Id
   */
  function deleteIncomeHandler(id) {
    const deleteConfirm = window.confirm("Do you want to delete income ?");
    if (deleteConfirm) {
      apiClient
        .delete("/income/" + id)
        .then((response) => {
          toast.warn("Income Has Deleted", toastifyConfig);
          if (response.data.success == true) {
            onDeleteHandler(response.data.income);
          }
        })
        .catch((error) => {
          console.log("Incomes 81 Line:", error);
          toast.error("Somethings Wrong!", toastifyConfig);
        });
    }
  }

  function editIncomeHandler(income) {
    setEditIncome(income);
    showEditModalHanlder();
  }

  function onIncomeUpdate(income, oldValue) {
    setIncomes((prevState) => {
      return prevState.map((item) => {
        if (item.id == income.id) {
          return income;
        }
        return item;
      });
    });

    //UPDATE SUM OF TOTAL
    setSum((prevState) => {
      const calSum = parseFloat(prevState) - parseFloat(oldValue);
      const newSum = parseFloat(calSum) + parseFloat(income.value);
      return newSum;
    });
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
                return <IncomeItem key={income.id} income={income} onEdit={editIncomeHandler} onDelete={deleteIncomeHandler} />;
              })}
          </ul>
        )}
        {/** OUTPUT SUM OF TOTAL */}
        {!isFetching && <SumOfTotal sum={sum} className="text-green-600 border-b-slate-600" />}
      </Card>
      {/** SHOW ADD INCOME MODAL ON ADD BUTTON CLICK */}
      {showModal && (
        <AddIncome onAdd={newIncomeHandler} showModal={showModal} hideModal={hideModalHandler} setShow={setShowModal} />
      )}
      {/** SHOW EDIT INCOME MODAL */}
      {showEditModal && (
        <EditIncome
          income={editIncome}
          onUpdate={onIncomeUpdate}
          showModal={showEditModal}
          hideModal={hideEditModalHandler}
          setShow={setShowEditModal}
        />
      )}
    </>
  );
}

export default Incomes;
