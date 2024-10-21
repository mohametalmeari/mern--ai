import { LuVideo } from "react-icons/lu";
import { getFormData } from "../lib/helpers";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { generateVideo } from "../redux/features/ai/reducers";
import { Empty, Error, Thinking, UnderConstruction } from "../components";

export const VideoGeneration = () => {
  const dispatch = useDispatch();

  const [missingPrompt, setMissingPrompt] = useState(true);

  const { video, loading, underConstruction, aiError } = useSelector(
    (state) => state.video
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const { prompt } = getFormData(e);

    if (!prompt) return;

    dispatch(generateVideo({ prompt }));

    e.target.reset();
    setMissingPrompt(true);
  };

  if (underConstruction) return <UnderConstruction />;

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
          name="prompt"
          placeholder="A man plying piano ..."
          className="-field"
          onChange={({ target }) => setMissingPrompt(!target.value)}
        />

        <button type="submit" className="form-btn" disabled={missingPrompt}>
          Generate
        </button>
      </form>

      {loading ? (
        <Thinking />
      ) : aiError ? (
        <Error error={aiError} />
      ) : !video ? (
        <Empty />
      ) : (
        <div className="video-wrapper">
          <video src={video} controls />
        </div>
      )}
    </main>
  );
};
