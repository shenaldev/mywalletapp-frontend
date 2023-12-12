function DashboardTabs({ currentTab, onTabChange }) {
  const currentTabClass = "text-primaryColor border-b-2 border-spacing-2 border-b-primaryColor";

  return (
    <div className="md:hidden flex gap-6 justify-center font-medium" role="tab" tabIndex="0">
      <button
        role="tab"
        tabIndex="1"
        className={currentTab == "payments" ? currentTabClass : undefined}
        onClick={onTabChange.bind(this, "payments")}
      >
        Payments
      </button>
      <button
        role="tab"
        tabIndex="2"
        className={currentTab == "incomes" ? currentTabClass : undefined}
        onClick={onTabChange.bind(this, "incomes")}
      >
        Incomes
      </button>
    </div>
  );
}

export default DashboardTabs;
