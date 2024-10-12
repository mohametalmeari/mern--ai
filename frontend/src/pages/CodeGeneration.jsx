import { IoMdCode } from "react-icons/io";
import { getFormData } from "../lib/helpers";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addToHistory, resetHistory } from "../redux/features/ai/codeSlice";
import { generateCode, getCodeHistory } from "../redux/features/ai/reducers";
import { ChatBubble, Empty, Thinking } from "../components";

export const CodeGeneration = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { history, loading } = useSelector((state) => state.code);

  const [missingMessage, setMissingMessage] = useState(true);

  useEffect(() => {
    dispatch(resetHistory());

    if (!id) return;

    dispatch(getCodeHistory(id));
  }, [dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { message } = getFormData(e);

    if (!message) return;

    dispatch(addToHistory({ text: message }));

    dispatch(generateCode({ id, message }));

    e.target.reset();
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
