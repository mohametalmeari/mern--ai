import { useDispatch, useSelector } from "react-redux";
import { getFormData } from "../../lib/helpers";
import { forgotPassword } from "../../redux/features/auth/reducers";
import { useState } from "react";
import { resetError } from "../../redux/features/auth/authSlice";

export const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [missingField, setMissingField] = useState(false);

  const { authError, loading, authSuccess } = useSelector(
    (state) => state.auth
  );

  if (authSuccess) {
    return (
      <main className="auth-form-wrapper">
        <h1>Reset Password</h1>
        <p className="success-message">
          Reset password link has been sent to your email.
          <br /> <br />
          Go back to{" "}
          <a href="/sign-in" className="nav-link">
            Sign in
          </a>
        </p>
      </main>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = getFormData(e);

    if (!data.email) return setMissingField(true);

    dispatch(forgotPassword(data));
  };

  const markMissingField = () => {
    return missingField
      ? { borderColor: "lightcoral", outlineColor: "lightcoral" }
      : {};
  };

  const removeMissingField = () => {
    setMissingField(false);
    dispatch(resetError());
  };

  return (
    <main className="auth-form-wrapper">
      <h1>Reset Password</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          style={markMissingField()}
          onChange={removeMissingField}
        />

        {missingField ? (
          <p className="error-message">Please fill in the missing field.</p>
        ) : authError ? (
          <p className="error-message">{authError}</p>
        ) : null}

        <button type="submit" className="form-btn" disabled={loading}>
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
