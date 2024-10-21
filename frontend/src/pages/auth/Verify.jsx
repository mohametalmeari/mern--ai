import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { activateAccount } from "../../redux/features/auth/reducers";

export const Verify = () => {
  const { token } = useParams();
  const dispatch = useDispatch();

  const { verified, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(activateAccount(token));
  }, [dispatch, token]);

  if (loading) return <main>Loading...</main>;

  return (
    <main>
      {verified ? (
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
