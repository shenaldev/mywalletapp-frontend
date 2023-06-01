import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import HamburgerButton from "../UI/HamburgerButton";

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
  const [navShown, setNavShown] = useState(false);
  const currentMonth = props.month;
  const sidebarRef = useRef();

  const monthClickHandler = (month) => {
    props.onMonthChange(month);
  };

  function sidebarShowHandler() {
    setNavShown((value) => (value = !value));
  }

  //HANDLE OUTSIDE CLICK
  useEffect(() => {
    if (window.innerWidth < 1024) {
      console.log("click");
      document.addEventListener("mousedown", outsideClickHandler);
    }

    return () => {
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  }, [sidebarRef]);

  function outsideClickHandler(e) {
    if (window.innerWidth < 1024) {
      if (!sidebarRef.current.contains(e.target)) {
        setNavShown(false);
      }
    }
  }

  return (
    <>
      {/***** HAMBURGER BUTTON FOR MOBILE VIEWS *****/}
      <div className="absolute top-10 left-6">
        <HamburgerButton onClick={sidebarShowHandler} />
      </div>
      <div className={`sidebar md:py-8 bg-primaryColor text-white lg:block ${navShown ? "block" : "hidden"}`} ref={sidebarRef}>
        {/***** CLOSE BUTTON FOR MOBILE VIEWS *****/}
        <button onClick={sidebarShowHandler} className="sidebar-close flex items-center justify-center lg:hidden">
          <AiOutlineClose color="white" size="1.3rem" />
        </button>
        {/***** NAVIGATION MENUE *****/}
        <h2 className="mt-8 md:mt-0 text-2xl font-semibold mb-6">My Wallet</h2>
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
    </>
  );
}

export default Sidebar;
