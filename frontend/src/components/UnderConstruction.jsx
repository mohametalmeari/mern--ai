import { TiWarning } from "react-icons/ti";

export const UnderConstruction = () => {
  return (
    <div className="empty">
      <TiWarning style={{ fontSize: "3rem", color: "rgba(240,200,1)" }} />
      <br />

      <img src="/under-construction.jpg" alt="under-construction" />

      <b>Under Construction</b>
      <br />
      <br />
      <p>
        <em>This service is currently unavailable. Please check back later.</em>
        <br />
        <br />
        <span>
          Go back to the{" "}
          <a href="/dashboard" className="nav-link">
            dashboard
          </a>
        </span>
      </p>
    </div>
  );
};
