import { IoSettingsOutline } from "react-icons/io5";

export const Settings = () => {
  return (
    <main className="page">
      <div className="page-header">
        <div className="-icon" style={{ background: "#aaaaaa22" }}>
          <IoSettingsOutline />
        </div>
        <div className="-text">
          <h1>Code Generation</h1>
          <h2>Generate code using descriptive text.</h2>
        </div>
      </div>
    </main>
  );
};
