const months = [
  { id: 0, name: "January", short: "Jan" },
  { id: 1, name: "February", short: "Feb" },
  { id: 2, name: "March", short: "Mar" },
  { id: 3, name: "April", short: "Apr" },
  { id: 4, name: "May", short: "May" },
  { id: 5, name: "June", short: "Jun" },
  { id: 6, name: "July", short: "Jul" },
  { id: 7, name: "August", short: "Aug" },
  { id: 8, name: "September", short: "Sep" },
  { id: 9, name: "October", short: "Oct" },
  { id: 10, name: "November", short: "Nov" },
  { id: 11, name: "December", short: "Dec" },
];

function Sidebar(props) {
  const currentMonth = props.month;
  const monthClickHandler = (month) => {
    props.onMonthChange(month);
  };

  return (
    <div className="pl-8 py-8 max-w-[14rem] min-w-[14rem] min-h-screen bg-primaryColor text-white">
      <h2 className="text-2xl font-semibold mb-6">My Wallet</h2>
      <span className="block bg-slate-100 w-full h-[1px]"></span>
      <nav className="mt-8">
        <ul>
          {months.map((month) => {
            return (
              <li
                key={month.id}
                className={`mb-4 ${
                  currentMonth == month.id ? "bg-bodyBackground text-slate-900 px-4 font-medium py-1 rounded-l-md" : undefined
                }`}
              >
                <button onClick={monthClickHandler.bind(this, month.id)}>{month.name}</button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
