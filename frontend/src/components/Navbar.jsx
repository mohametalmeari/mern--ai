import { FaRegUser } from "react-icons/fa6";
import { RiMenu2Fill } from "react-icons/ri";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="menu-icon">
        <RiMenu2Fill />
      </div>
      <div />
      <div className="user-icon">
        <FaRegUser />
      </div>
    </div>
  );
};
