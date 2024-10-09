import { LuVideo } from "react-icons/lu";
import { getFormData } from "../lib/helpers";

export const VideoGeneration = () => {
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
          style={{ background: "#03A9F422", color: "#03A9F4" }}
        >
          <LuVideo />
        </div>
        <div className="-text">
          <h1>Video Generation</h1>
          <h2>Turn your prompt into video.</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="generate-form">
        <input
          type="text"
          name="message"
          placeholder="A man plying piano ..."
          className="-field"
        />

        <button type="submit" className="-btn">
          Generate
        </button>
      </form>
    </main>
  );
};
