import { FaRegImage } from "react-icons/fa6";
import { getFormData, setFieldValue } from "../lib/helpers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateImage } from "../redux/features/ai/reducers";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { Empty, Thinking, UnderConstruction } from "../components";

export const ImageGeneration = () => {
  const dispatch = useDispatch();

  const [missingPrompt, setMissingPrompt] = useState(true);

  const { images, loading, underConstruction } = useSelector(
    (state) => state.image
  );

  useEffect(() => {
    setFieldValue("size", 512);
    setFieldValue("samples", 2);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { prompt, size, samples } = getFormData(e);

    if (!prompt) return;

    dispatch(generateImage({ prompt, size, samples: parseInt(samples) }));

    setFieldValue("prompt", "");
  };

  if (underConstruction) return <UnderConstruction />;

  return (
    <main className="page">
      <div className="page-header">
        <div
          className="-icon"
          style={{ background: "#FF572222", color: "#FF5722" }}
        >
          <FaRegImage />
        </div>
        <div className="-text">
          <h1>Image Generation</h1>
          <h2>Turn your prompt into an image.</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="generate-form">
        <input
          type="text"
          name="prompt"
          placeholder="A picture of a cat wearing a hat ..."
          className="-field"
          onChange={({ target }) => setMissingPrompt(!target.value)}
        />

        <select name="samples" className="-drop-list">
          <option value="1">1 Photo</option>
          <option value="2">2 Photos</option>
          <option value="3">3 Photos</option>
          <option value="4">4 Photos</option>
        </select>

        <select name="size" className="-drop-list">
          <option value="256">Low (256x256)</option>
          <option value="512">Medium (512x512)</option>
          <option value="1024">High (1024x1024)</option>
        </select>

        <button type="submit" className="form-btn" disabled={missingPrompt}>
          Generate
        </button>
      </form>

      {loading ? (
        <Thinking />
      ) : !images || images.length === 0 ? (
        <Empty />
      ) : (
        <div
          className="images"
          style={{ maxWidth: `${images.length * 20}rem` }}
        >
          {images.map((image, index) => (
            <div key={index} className="image-wrapper">
              <img src={image} alt="Generated" />
              <div className="-controls">
                <a
                  className="-btn"
                  href={image}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MdOutlineZoomOutMap />
                </a>
                <a
                  className="-btn"
                  href={image}
                  target="_blank"
                  rel="noreferrer"
                  download
                >
                  <FaCloudDownloadAlt />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};
