import { useParams } from "react-router-dom";
import { getFormData } from "../lib/helpers";
import { BiConversation } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  generateConversation,
  getConversationHistory,
} from "../redux/features/ai/reducers";
import { ChatBubble, Empty, Thinking } from "../components";
import {
  addToHistory,
  resetHistory,
} from "../redux/features/ai/conversationSlice";

export const Conversation = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { history, loading } = useSelector((state) => state.chat);

  const [missingMessage, setMissingMessage] = useState(true);

  useEffect(() => {
    dispatch(resetHistory());

    if (!id) return;

    dispatch(getConversationHistory(id));
  }, [dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { message } = getFormData(e);

    if (!message) return;

    dispatch(addToHistory({ text: message }));

    dispatch(generateConversation({ id, message }));

    e.target.reset();
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
          onChange={({ target }) => setMissingMessage(!target.value)}
        />
        <button type="submit" className="form-btn" disabled={missingMessage}>
          Generate
        </button>
      </form>

      {loading && <Thinking />}

      {history.length === 0 ? (
        <Empty />
      ) : (
        <ul className="chats-list">
          {[...history].reverse().map(({ parts, role }, index) => (
            <ChatBubble key={index} text={parts[0].text} role={role} />
          ))}
        </ul>
      )}
    </main>
  );
};
