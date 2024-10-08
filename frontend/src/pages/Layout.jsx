import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";
import { Navbar } from "../components";

export const Layout = () => (
  <div className="App">
    <Sidebar />
    <div className="page-container">
      <Navbar />
      <Outlet />
    </div>
  </div>
);
