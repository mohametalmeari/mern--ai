import { IoMdCode } from "react-icons/io";
import { getFormData } from "../lib/helpers";

export const CodeGeneration = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { message } = getFormData(e);

    console.log({ message });
  };

  return (
    <main className="page">
      <div className="page-header">
        <div
          className="-icon"
          style={{ background: "#9C27B022", color: "#9C27B0" }}
        >
          <IoMdCode />
        </div>
        <div className="-text">
          <h1>Code Generation</h1>
          <h2>Generate code using descriptive text.</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="generate-form">
        <input
          type="text"
          name="message"
          placeholder="Simple toggle button using react hooks ..."
          className="-field"
        />

        <button type="submit" className="form-btn">
          Generate
        </button>
      </form>
    </main>
  );
};
