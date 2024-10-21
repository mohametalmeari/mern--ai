import { FaRegUser } from "react-icons/fa6";
import { RiMenu2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { openMenu } from "../redux/features/menu/menuSlice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { signOut } from "../redux/features/auth/reducers";

export const Navbar = () => {
  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState(false);

  const { loading } = useSelector((state) => state.auth);

  const handleOpen = () => {
    dispatch(openMenu());
  };

  useEffect(() => {
    const closePopup = (e) => {
      if (e.target.closest(".user-icon")) return;
      setShowPopup(false);
    };

    window.addEventListener("click", closePopup);

    return () => window.removeEventListener("click", closePopup);
  }, []);

  const toggleShowPopup = () => {
    setShowPopup(!showPopup);
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <div className="navbar">
      <div className="menu-icon" onClick={handleOpen}>
        <RiMenu2Fill />
      </div>
      <div />
      <div className="user-icon" onClick={toggleShowPopup}>
        <FaRegUser />
      </div>
      <div className="user-popup" style={{ display: !showPopup && "none" }}>
        <Link to="/dashboard/settings">Manage Account</Link>
        <button onClick={handleSignOut} disabled={loading}>
          Logout
        </button>
      </div>
    </div>
  );
};
