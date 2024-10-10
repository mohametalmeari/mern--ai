export const ResetPassword = () => {
  return (
    <main className="auth-form-wrapper">
      <h1>New Password</h1>
      <form className="auth-form">
        <input type="password" name="password" placeholder="New password" />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
        />
        <button type="submit" className="form-btn">
          Submit
        </button>
      </form>
    </main>
  );
};
