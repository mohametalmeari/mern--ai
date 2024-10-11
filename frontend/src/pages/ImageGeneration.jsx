import { FaRegImage } from "react-icons/fa6";
import { getFormData, setFieldValue } from "../lib/helpers";
import { useEffect } from "react";

export const ImageGeneration = () => {
  useEffect(() => {
    setFieldValue("size", 512);
    setFieldValue("number", 2);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { message, number, size } = getFormData(e);

    console.log({ message, number, size });
  };

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
          name="message"
          placeholder="A picture of a cat wearing a hat ..."
          className="-field"
        />

        <select name="number" className="-drop-list">
          <option value="1">1 Photo</option>
          <option value="2">2 Photos</option>
          <option value="3">3 Photos</option>
          <option value="4">4 Photos</option>
          <option value="5">5 Photos</option>
        </select>

        <select name="size" className="-drop-list">
          <option value="256">Low (256x256)</option>
          <option value="512">Medium (512x512)</option>
          <option value="1024">High (1024x1024)</option>
        </select>

        <button type="submit" className="form-btn">
          Generate
        </button>
      </form>
    </main>
  );
};
