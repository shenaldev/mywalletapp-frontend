import { Link } from "react-router-dom";
//IMPORT ICONS
import { BiUserCircle } from "react-icons/bi";
//IMPORT COMPONENTS
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../UI/Elements/Dropdown";

function ProfileDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <BiUserCircle size="2rem" color="#4B56D2" className="cursor-pointer -z-10" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white px-6 pt-6 pb-4 min-w-[8rem] shadow-md rounded flex flex-col ">
        <DropdownMenuItem>
          <Link to="#" className="hover:text-primaryColor">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/logout" className="hover:text-primaryColor">
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropDown;
