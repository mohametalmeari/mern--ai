import { Outlet } from "react-router-dom";
import { Sidebar, UpgradeToPremium } from "../components";
import { Navbar } from "../components";

export const Layout = () => (
  <div className="App">
    <Sidebar />
    <div className="page-container">
      <Navbar />
      <Outlet />
    </div>

    <UpgradeToPremium />
  </div>
);
