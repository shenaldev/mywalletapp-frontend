import Incomes from "../Incomes/Incomes";
import Payments from "../Payments/Payments";

function Dashboard() {
  return (
    <div className="grid grid-cols-2 gap-4 mt-12">
      <Payments />
      <Incomes />
    </div>
  );
}

export default Dashboard;
