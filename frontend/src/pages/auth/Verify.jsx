export const Verify = () => {
  return (
    <main>
      {true ? (
        <p>
          Your email has been verified.{" "}
          <a href="/sign-in" className="nav-link">
            Sign in
          </a>
        </p>
      ) : (
        <p>
          Invalid or expired link. Go back to{" "}
          <a href="/" className="nav-link">
            Home
          </a>
        </p>
      )}
    </main>
  );
};
