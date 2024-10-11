import { FiMusic } from "react-icons/fi";
import { getFormData } from "../lib/helpers";

export const MusicGeneration = () => {
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
          style={{ background: "#4CAF5022", color: "#4CAF50" }}
        >
          <FiMusic />
        </div>
        <div className="-text">
          <h1>Music Generation</h1>
          <h2>Turn your prompt into music.</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="generate-form">
        <input
          type="text"
          name="message"
          placeholder="Piano solo ..."
          className="-field"
        />

        <button type="submit" className="form-btn">
          Generate
        </button>
      </form>
    </main>
  );
};
