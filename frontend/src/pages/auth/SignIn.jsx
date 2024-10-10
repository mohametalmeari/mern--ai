export const SignIn = () => {
  return (
    <main className="auth-form-wrapper">
      <h1>Sign In</h1>
      <form className="auth-form">
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit" className="form-btn">
          Sign In
        </button>
      </form>

      <p>
        <a href="/forgot-password" className="nav-link">
          Forgot password?
        </a>
      </p>

      <p>
        Don't have an account?{" "}
        <a href="/sign-up" className="nav-link">
          Sign up
        </a>
      </p>
    </main>
  );
};
