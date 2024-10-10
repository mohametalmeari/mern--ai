export const ForgotPassword = () => {
  return (
    <main className="auth-form-wrapper">
      <h1>Reset Password</h1>
      <form className="auth-form">
        <input type="email" name="password" placeholder="Email" />
        <button type="submit" className="form-btn">
          Send
        </button>
      </form>

      <p>
        Remember your password?{" "}
        <a href="/sign-in" className="nav-link">
          Sign in
        </a>
      </p>
    </main>
  );
};
