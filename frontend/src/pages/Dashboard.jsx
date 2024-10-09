import { Link } from "react-router-dom";
import { Links } from "../components";
import { FaArrowRight } from "react-icons/fa6";

export const Dashboard = () => {
  return (
    <main className="dashboard-page">
      <div className="dashboard-header">
        <h1>Explore the power of AI</h1>
        <h2>Chat with the smartest AI - Experience the power of AI</h2>
      </div>
      <ul className="dashboard-links">
        {Links.slice(1, 6).map((l) => (
          <li key={l.path}>
            <Link to={l.path} className="dashboard-link">
              <div
                className="dashboard-link-icon"
                style={{ color: l.color, background: `${l.color}22` }}
              >
                {l.icon}
              </div>
              <div className="dashboard-link-name">{l.name}</div>
              <FaArrowRight />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};
