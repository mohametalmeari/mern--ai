import { FaRegUserCircle } from "react-icons/fa";
import { BsRobot } from "react-icons/bs";
import { MdOutlineErrorOutline } from "react-icons/md";

export const UserIcon = ({ role = "model" }) => {
  const style = {
    model: { color: "var(--grad-start-color)", marginTop: "-0.25rem" },
    user: { color: "rgb(255, 193, 7)" },
    error: { color: "red" },
  };

  const avatar = {
    model: <BsRobot />,
    user: <FaRegUserCircle />,
    error: <MdOutlineErrorOutline />,
  };

  return (
    <div style={style[role]} className="-avatar">
      {avatar[role]}
    </div>
  );
};
