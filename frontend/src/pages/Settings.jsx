import { IoSettingsOutline } from "react-icons/io5";
import { GiElectric } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { openUpgrade } from "../redux/features/menu/menuSlice";
import { subscribe } from "../redux/features/stripe/reducers/subscribe";

export const Settings = () => {
  const dispatch = useDispatch();
  const { isPremium } = useSelector((state) => state.auth);

  const handleOpenUpgrade = () => {
    dispatch(openUpgrade());
  };

  const handleManage = () => {
    dispatch(subscribe());
  };
  return (
    <main className="page">
      <div className="page-header">
        <div className="-icon" style={{ background: "#aaaaaa22" }}>
          <IoSettingsOutline />
        </div>
        <div className="-text">
          <h1>Settings</h1>
          <h2>Manage account settings.</h2>
        </div>
      </div>
      <div className="settings">
        {isPremium ? (
          <>
            <p>You are currently on a pro plan.</p>
            <button className="form-btn" onClick={handleManage}>
              Manage Subscription
            </button>
          </>
        ) : (
          <>
            <p>You are currently on a free plan.</p>
            <button className="button _primary" onClick={handleOpenUpgrade}>
              Upgrade
              <GiElectric />
            </button>
          </>
        )}
      </div>
    </main>
  );
};
