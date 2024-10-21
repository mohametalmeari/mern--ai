import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { BiConversation } from "react-icons/bi";
import { FaRegImage } from "react-icons/fa6";
import { LuVideo } from "react-icons/lu";
import { IoMdCode } from "react-icons/io";
import { FiMusic } from "react-icons/fi";
import { IoClose, IoSettingsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu, openUpgrade } from "../redux/features/menu/menuSlice";
import { useEffect } from "react";
import { checkFreeTier } from "../redux/features/auth/reducers";
import { GiElectric } from "react-icons/gi";

export const Links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <RxDashboard />,
    color: "#2196F3",
  },
  {
    name: "Conversation",
    path: "/dashboard/conversation",
    icon: <BiConversation />,
    color: "#FFC107",
  },
  {
    name: "Image Generation",
    path: "/dashboard/image-generation",
    icon: <FaRegImage />,
    color: "#FF5722",
  },
  {
    name: "Video Generation",
    path: "/dashboard/video-generation",
    icon: <LuVideo />,
    color: "#03A9F4",
  },
  {
    name: "Music Generation",
    path: "/dashboard/music-generation",
    icon: <FiMusic />,
    color: "#4CAF50",
  },
  {
    name: "Code Generation",
    path: "/dashboard/code-generation",
    icon: <IoMdCode />,
    color: "#9C27B0",
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: <IoSettingsOutline />,
  },
];

export const Sidebar = () => {
  const path = window.location.pathname;

  const { isOpen } = useSelector((state) => state.menu);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeMenu());
  };

  return (
    <nav className={`sidebar ${isOpen ? "_open" : ""}`}>
      <IoClose className="close-menu-icon" onClick={handleClose} />
      <a href="/">
        <div className="logo">
          <img src="/logo.webp" alt="genius" />
          Genius
        </div>
      </a>
      <ul className="sidebar-menu" onClick={handleClose}>
        {Links.map((l) => (
          <li key={l.path} className="sidebar-menu-item">
            <Link to={l.path} className={path === l.path ? "active" : ""}>
              <span style={{ color: l.color }}>{l.icon}</span>
              {l.name}
            </Link>
          </li>
        ))}
      </ul>
      <SidebarFooter />
    </nav>
  );
};

const SidebarFooter = () => {
  const dispatch = useDispatch();

  const { isPremium, freeGenerations } = useSelector((state) => state.auth);

  const { history: chatHistory } = useSelector((state) => state.chat);
  const { history: codeHistory } = useSelector((state) => state.code);
  const { images } = useSelector((state) => state.image);
  const { video } = useSelector((state) => state.video);
  const { audio } = useSelector((state) => state.music);

  useEffect(() => {
    dispatch(checkFreeTier());
  }, [dispatch, chatHistory, codeHistory, images, video, audio]);

  if (isPremium) {
    return null;
  }

  const handleOpenUpgrade = () => {
    dispatch(openUpgrade());
  };

  return (
    <div className="sidebar-footer">
      <span>{freeGenerations} / 5 Free Generations</span>
      <ProgressBar progress={freeGenerations} max={5} />
      <button className="button _primary" onClick={handleOpenUpgrade}>
        Upgrade
        <GiElectric />
      </button>
    </div>
  );
};

const ProgressBar = ({ progress, max }) => {
  return (
    <div
      style={{
        background: "white",
        width: "100%",
        height: "0.8rem",
        borderRadius: "1rem",
        margin: "0.5rem auto",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "var( --grad-start-color)",
          height: "100%",
          width: `${(progress / max) * 100}%`,
        }}
      />
    </div>
  );
};
