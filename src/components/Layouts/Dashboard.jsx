import { useOutletContext } from "react-router-dom";
//IMPORT COMPONENTS
import Incomes from "../Incomes/Incomes";
import Payments from "../Payments/Payments";

function Dashboard() {
  const [currentMonth, currentYear] = useOutletContext();

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mt-12">
        <Payments year={currentYear} month={currentMonth} />
        <Incomes year={currentYear} month={currentMonth} />
      </div>
    </>
  );
}

export default Dashboard;
