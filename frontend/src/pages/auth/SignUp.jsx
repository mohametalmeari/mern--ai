import { useDispatch, useSelector } from "react-redux";
import { getFormData } from "../../lib/helpers";
import { register } from "../../redux/features/auth/reducers";
import { useState } from "react";
import { resetError } from "../../redux/features/auth/authSlice";

export const SignUp = () => {
  const dispatch = useDispatch();

  const [missingFields, setMissingFields] = useState([]);
  const [error, setError] = useState(null);

  const { loading, authError, signedUp } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = getFormData(e);

    const missingFields_ = [];
    Object.keys(data).forEach((k) => {
      if (!data[k]) {
        missingFields_.push(k);
      }
    });
    if (missingFields_.length > 0) {
      setMissingFields(missingFields_);
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    dispatch(register(data));
  };

  const markMissingField = (fieldName) => {
    return missingFields.includes(fieldName)
      ? { borderColor: "lightcoral", outlineColor: "lightcoral" }
      : {};
  };

  const removeMissingField = (fieldName) => {
    setMissingFields(missingFields.filter((f) => f !== fieldName));
    setError(null);
    dispatch(resetError());
  };

  if (signedUp) {
    return (
      <main className="auth-form-wrapper">
        <h1>Sign Up</h1>
        <p className="success-message">
          You have successfully signed up! <br />
          Please check your email to verify your account.
          <br /> <br />
          Go back to{" "}
          <a href="/sign-in" className="nav-link">
            Sign in
          </a>
        </p>
      </main>
    );
  }

  return (
    <main className="auth-form-wrapper">
      <h1>Sign Up</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          style={markMissingField("email")}
          onChange={() => removeMissingField("email")}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          style={markMissingField("password")}
          onChange={() => removeMissingField("password")}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          style={markMissingField("confirmPassword")}
          onChange={() => removeMissingField("confirmPassword")}
        />

        {missingFields.length > 0 ? (
          <p className="error-message">Please fill in the missing fields.</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : authError ? (
          <p className="error-message">{authError}</p>
        ) : null}

        <button type="submit" className="form-btn" disabled={loading}>
          Sign Up
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <a href="/sign-in" className="nav-link">
          Sign in
        </a>
      </p>
    </main>
  );
};
