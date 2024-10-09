import { FaRegUser } from "react-icons/fa6";
import { RiMenu2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { openMenu } from "../redux/features/menu/menuSlice";

export const Navbar = () => {
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(openMenu());
  };

  return (
    <div className="navbar">
      <div className="menu-icon" onClick={handleOpen}>
        <RiMenu2Fill />
      </div>
      <div />
      <div className="user-icon">
        <FaRegUser />
      </div>
    </div>
  );
};
