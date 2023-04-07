import { useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
//IMPORT UTIlS
import { getYear } from "../../util/Dates";

function Header(props) {
  const currentYear = getYear();
  const [avatarClick, setAvatarClick] = useState(false);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  //SHOW DROPDOWN MENU ON AVATAR CLICK
  function avatarClickHandler() {
    setAvatarClick((state) => (state = !state));
  }

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
      <div className="relative">
        <BiUserCircle size="2rem" color="#4B56D2" className="cursor-pointer" onClick={avatarClickHandler} />
        <div
          className={`${
            avatarClick ? "flex" : "hidden"
          } absolute flex-col gap-2 bg-white shadow px-4 py-6 rounded-sm w-36 right-0 font-medium`}
        >
          <Link to="/profile" className="hover:text-primaryColor">
            Profile
          </Link>
          <Link to="/logout" className="hover:text-primaryColor">
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
