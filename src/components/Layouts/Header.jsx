import { useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

function Header() {
  const [avatarClick, setAvatarClick] = useState(false);
  function avatarClickHandler() {
    setAvatarClick((state) => (state = !state));
  }
  return (
    <header className="flex justify-between mx-8 items-center">
      <div>
        <select
          name="year"
          id="year"
          className="bg-gray-50 border border-gray-300 text-gray-900 px-4 py-1 rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full"
        >
          <option value="2022">2022</option>
          <option value="2022">2022</option>
          <option value="2022">2022</option>
          <option value="2022">2022</option>
          <option value="2022">2022</option>
          <option value="2022">2022</option>
          <option value="2022">2022</option>
          <option value="2022">2022</option>
        </select>
      </div>
      <h4 className="text-lg text-slate-700 font-medium">This Month Transactions</h4>
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
