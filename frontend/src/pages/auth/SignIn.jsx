import { useDispatch, useSelector } from "react-redux";
import { getFormData } from "../../lib/helpers";
import { useState } from "react";
import { resetError } from "../../redux/features/auth/authSlice";
import { signIn } from "../../redux/features/auth/reducers";

export const SignIn = () => {
  const dispatch = useDispatch();

  const [missingFields, setMissingFields] = useState([]);

  const { authError } = useSelector((state) => state.auth);

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

    dispatch(signIn(data));
  };

  const markMissingField = (fieldName) => {
    return missingFields.includes(fieldName)
      ? { borderColor: "lightcoral", outlineColor: "lightcoral" }
      : {};
  };

  const removeMissingField = (fieldName) => {
    setMissingFields(missingFields.filter((f) => f !== fieldName));
    dispatch(resetError());
  };

  return (
    <main className="auth-form-wrapper">
      <h1>Sign In</h1>
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

        {missingFields.length > 0 ? (
          <p className="error-message">Please fill in the missing fields.</p>
        ) : authError ? (
          <p className="error-message">{authError}</p>
        ) : null}

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
