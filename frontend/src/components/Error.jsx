export const Error = ({ error }) => {
  return (
    <div className="error">
      <img src="/error.png" alt="error" />
      <h2>{error || "An error occurred. Please try again later."}</h2>
    </div>
  );
};
