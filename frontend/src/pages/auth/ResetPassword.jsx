import { useDispatch, useSelector } from "react-redux";
import { getFormData } from "../../lib/helpers";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { resetError } from "../../redux/features/auth/authSlice";
import { resetPassword } from "../../redux/features/auth/reducers";

export const ResetPassword = () => {
  const dispatch = useDispatch();

  const { token } = useParams();

  const [missingFields, setMissingFields] = useState([]);
  const [error, setError] = useState(null);

  const { authError, authSuccess } = useSelector((state) => state.auth);

  if (authSuccess) {
    return (
      <main className="auth-form-wrapper">
        <h1>New Password</h1>
        <p className="success-message">
          Password has been reset successfully.
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

    if (data.newPassword !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    dispatch(resetPassword({ ...data, token }));
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

  return (
    <main className="auth-form-wrapper">
      <h1>New Password</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="password"
          name="newPassword"
          placeholder="New password"
          style={markMissingField("password")}
          onChange={() => removeMissingField("password")}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
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

        <button type="submit" className="form-btn">
          Submit
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
