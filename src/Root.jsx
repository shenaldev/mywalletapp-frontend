//IMPORT CSS
import "react-toastify/dist/ReactToastify.min.css";
//IMPORT LIBARIES
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
//IMPORT COMPONENTS
import Sidebar from "./components/Layouts/Sidebar";
import Header from "./components/Layouts/Header";
//IMPORT UTILLS
import { isAuth, setLogout } from "./util/Auth";
import apiClient, { axiosError } from "./util/Axios";
import { getMonth, getYear } from "./util/Dates";

function Root() {
  //CHECK AUTHENTICATION
  const auth = isAuth();
  if (!auth) {
    return <Navigate to="/auth/login" replace />;
  }

  //CHECK TOKEN IS EXPIRED
  useEffect(() => {
    apiClient.get("/check-token").catch((error) => {
      if (error.reponse.status === 401) {
        setLogout();
        window.location.replace("/auth/login/401");
      }
    });
  }, []);

  // STATE VARIABLES
  const [currentYear, setCurrentYear] = useState(getYear());
  const [registerYear, setRegisterYear] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  //MONTH CHANGE HANDLER FROM SIDEBAR
  function monthChangeHandler(month) {
    setCurrentMonth(month);
  }

  // GET USER REGISTERED YEAR
  useEffect(() => {
    apiClient
      .get("/user/register-year")
      .then((response) => {
        setRegisterYear(response.data.year);
      })
      .catch((error) => {
        const err = axiosError(error);
        console.log("Root Line 28", err);
      });
  }, []);

  /**
   * HANDLE SELECTED YEAR CHANGE IN HEADER COMPONENT
   */
  function yearChangeHandler(year) {
    setCurrentYear(year);
  }

  return (
    <div className="flex">
      <Sidebar month={currentMonth} onMonthChange={monthChangeHandler} />
      <main className="w-full px-2 md:px-8 py-8">
        <Header year={registerYear} onYearChange={yearChangeHandler} />
        <Outlet context={[currentMonth, currentYear]} />
      </main>
      <ToastContainer />
    </div>
  );
}

export default Root;
