import { FaCheck } from "react-icons/fa6";
import { Links } from "./Sidebar";
import { GiElectric } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { closeUpgrade } from "../redux/features/menu/menuSlice";

export const UpgradeToPremium = () => {
  const dispatch = useDispatch();
  const { upgradeIsOpen } = useSelector((state) => state.menu);
  const { isPremium } = useSelector((state) => state.auth);

  if (!upgradeIsOpen || isPremium) return null;

  const handleClose = () => {
    dispatch(closeUpgrade());
  };

  return (
    <div className="upgrade-to-premium-container">
      <div className="upgrade-to-premium">
        <IoClose className="close-upgrade-icon" onClick={handleClose} />

        <div className="-header">
          Upgrade to Genius <span className="pill">PRO</span>
        </div>

        <ul className="-services-list">
          {Links.slice(1, 6).map((l) => (
            <li key={l.path} className="-service">
              <div
                className="-icon"
                style={{ color: l.color, background: `${l.color}22` }}
              >
                {l.icon}
              </div>
              <div className="-name">{l.name}</div>
              <FaCheck />
            </li>
          ))}
        </ul>

        <button className="button _primary">
          Upgrade
          <GiElectric />
        </button>
      </div>
    </div>
  );
};
