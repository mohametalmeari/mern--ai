import { FaRegUserCircle } from "react-icons/fa";
import { BsRobot } from "react-icons/bs";
export const UserIcon = ({ role = "model" }) => {
  const style =
    role !== "user"
      ? { color: "var(--grad-start-color)", marginTop: "-0.25rem" }
      : { color: "var(--grad-end-color)" };
  return (
    <div style={style} className="-avatar">
      {role === "user" ? <FaRegUserCircle /> : <BsRobot />}
    </div>
  );
};
