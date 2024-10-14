import { FiMusic } from "react-icons/fi";
import { getFormData } from "../lib/helpers";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { generateMusic } from "../redux/features/ai/reducers";
import { Empty, Thinking, UnderConstruction } from "../components";

export const MusicGeneration = () => {
  const dispatch = useDispatch();

  const [missingPrompt, setMissingPrompt] = useState(true);

  const { audio, loading, underConstruction } = useSelector(
    (state) => state.music
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const { prompt } = getFormData(e);

    console.log(prompt);

    if (!prompt) return;

    dispatch(generateMusic({ prompt }));

    e.target.reset();
    setMissingPrompt(true);
  };

  if (underConstruction) return <UnderConstruction />;

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
          name="prompt"
          placeholder="Piano solo ..."
          className="-field"
          onChange={({ target }) => setMissingPrompt(!target.value)}
        />

        <button type="submit" className="form-btn" disabled={missingPrompt}>
          Generate
        </button>
      </form>

      {loading ? (
        <Thinking />
      ) : !audio ? (
        <Empty />
      ) : (
        <div className="music-wrapper">
          <audio src={audio} controls />
        </div>
      )}
    </main>
  );
};
