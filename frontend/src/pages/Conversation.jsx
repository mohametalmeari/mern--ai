import { getFormData } from "../lib/helpers";
import { BiConversation } from "react-icons/bi";

export const Conversation = () => {
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
          style={{ background: "#FFC10722", color: "#FFC107" }}
        >
          <BiConversation />
        </div>
        <div className="-text">
          <h1>Conversation</h1>
          <h2>Our most advanced conversation model.</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="generate-form">
        <input
          type="text"
          name="message"
          placeholder="Ask me anything ..."
          className="-field"
        />
        <button type="submit" className="form-btn">
          Generate
        </button>
      </form>
    </main>
  );
};
