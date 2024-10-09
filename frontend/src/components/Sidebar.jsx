import { Link, NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { BiConversation } from "react-icons/bi";
import { FaRegImage } from "react-icons/fa6";
import { LuVideo } from "react-icons/lu";
import { IoMdCode } from "react-icons/io";
import { FiMusic } from "react-icons/fi";
import { IoClose, IoSettingsOutline } from "react-icons/io5";

const Links = [
  { name: "Dashboard", path: "/dashboard", icon: <RxDashboard /> },
  {
    name: "Conversation",
    path: "/dashboard/conversation",
    icon: <BiConversation />,
  },
  {
    name: "Image Generation",
    path: "/dashboard/image-generation",
    icon: <FaRegImage />,
  },
  {
    name: "Video Generation",
    path: "/dashboard/video-generation",
    icon: <LuVideo />,
  },
  {
    name: "Music Generation",
    path: "/dashboard/music-generation",
    icon: <FiMusic />,
  },
  {
    name: "Code Generation",
    path: "/dashboard/code-generation",
    icon: <IoMdCode />,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: <IoSettingsOutline />,
  },
];

export const Sidebar = () => {
  const path = window.location.pathname;

  return (
    <nav className="sidebar">
      <IoClose className="close-menu-icon" />
      <a href="/">
        <div className="logo">
          <img src="/logo.webp" alt="genius" />
          Genius
        </div>
      </a>
      <ul className="sidebar-menu">
        {Links.map((l) => (
          <li key={l.path} className="sidebar-menu-item">
            <Link to={l.path} className={path === l.path ? "active" : ""}>
              {l.icon}
              {l.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
