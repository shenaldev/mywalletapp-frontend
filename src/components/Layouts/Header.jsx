import { useState } from "react";
//IMPORT UTIlS
import { getYear } from "../../util/Dates";
//IMPORT COMPONENTS
import ProfileDropDown from "./ProfileDropdown";

function Header(props) {
  const currentYear = getYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  /**
   * @param {*} start user registered year
   * @param {*} end Current Year
   * @returns options[] List of years
   */
  function getYearsOptions(start, end) {
    let options = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
    return options;
  }

  function yearChangeHandler(e) {
    setSelectedYear(e.target.value);
    props.onYearChange(e.target.value);
  }

  return (
    <header className="flex justify-end md:justify-between gap-8 md:mx-8 items-center">
      <div>
        <select
          name="year"
          id="year"
          value={selectedYear}
          className="bg-gray-50 border border-gray-300 text-gray-900 md:ml-8 lg:ml-0 px-4 py-1 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full"
          onChange={yearChangeHandler}
        >
          {!props.year && <option className="text-sm">Loading...</option>}
          {props.year && getYearsOptions(props.year, currentYear)}
        </select>
      </div>
      <h4 className="hidden md:block text-lg text-slate-700 font-medium">This Month Transactions</h4>
      <ProfileDropDown />
    </header>
  );
}

export default Header;
