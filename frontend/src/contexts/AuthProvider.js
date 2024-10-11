import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { checkAuth } from "../redux/features/auth/reducers/checkAuth";

const PUBLIC_LINKS = [
  "/sign-in",
  "/sign-up",
  "/",
  "/verify/*",
  "/reset-password/*",
  "/forgot-password",
];

const isPublicPath = (path, links) => {
  const path_ = path.replace(/\/$/, "") || "/";
  return links.some((l) => {
    if (l.endsWith("/*")) {
      return path_.startsWith(l.slice(0, -1));
    }
    return path_ === l;
  });
};

const GUEST_ONLY_LINKS = ["/sign-in", "/sign-up", "/forgot-password"];

const isGuestOnlyPath = (path, links) => {
  const path_ = path.replace(/\/$/, "") || "/";
  return links.includes(path_);
};

const SIGN_IN = "/sign-in";
const AFTER_SIGN_IN = "/dashboard";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get("redirect") || AFTER_SIGN_IN;

  const path = window.location.pathname;

  const isPublic = isPublicPath(path, PUBLIC_LINKS);

  const isGuestOnly = isGuestOnlyPath(path, GUEST_ONLY_LINKS);

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch, path]);

  useEffect(() => {
    if (!isPublic && !isAuthenticated && isAuthenticated !== undefined) {
      navigate(`${SIGN_IN}?redirect=${path}`);
    } else if (isAuthenticated && isGuestOnly) {
      navigate(redirect);
    }
  }, [navigate, isAuthenticated, isPublic, isGuestOnly, path, redirect]);

  if (isAuthenticated === undefined || (!isAuthenticated && !isPublic))
    return <main />;

  return children;
};
