import { useOutletContext } from "react-router-dom";
import { useState } from "react";
//IMPORT COMPONENTS
import Incomes from "../Incomes/Incomes";
import Payments from "../Payments/Payments";
import DashboardTabs from "./DasboardTabs";

function Dashboard() {
  const [currentMonth, currentYear] = useOutletContext();
  const [currentTab, setCurrentTab] = useState("payments");

  function tabChangeHandler(tab) {
    setCurrentTab(tab);
  }

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4 mt-12">
        {/******** IF MOBILE DEVICE SHOW TABS AND TAB CONENT ************/}
        <DashboardTabs currentTab={currentTab} onTabChange={tabChangeHandler} />
        <Payments year={currentYear} month={currentMonth} className={currentTab == "payments" ? "block" : undefined} />
        <Incomes year={currentYear} month={currentMonth} className={currentTab == "incomes" ? "block" : undefined} />
      </div>
    </>
  );
}

export default Dashboard;
