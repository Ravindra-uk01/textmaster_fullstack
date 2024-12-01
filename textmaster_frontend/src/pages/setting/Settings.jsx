import { useNavigate, useParams } from "react-router-dom";
import Base from "../Base/Base";
import { useEffect, useState } from "react";

const Settings = ({ children, currentTab }) => {
  const [tab, setTab] = useState(currentTab);
  const navigate = useNavigate();

//   useEffect(() => {
//     console.log('running in tab ')
//     setTab(tab);
//   }, [tab]);

  console.log("tab is ", tab);
  console.log('currentTab is ', currentTab);

  return (
    <Base>
      <div className="setting_navbar">
        <div className="setting_navbar-heading">
          <h2>Settings</h2>
        </div>
        <div className="setting_navbar-menu">
          {/* {["account", "profile"].map((menuItem) => { */}
          {["account"].map((menuItem) => {
            return (
              <div
                key={menuItem}
                className={`capitalize setting_navbar-menuItem ${
                  tab === menuItem ? "active" : ""
                }`}
                onClick={() => { navigate(`/settings/${menuItem}`)}}
                aria-current={tab === menuItem ? "page" : undefined}
              >
                <span>{menuItem}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-2">
        {children}
        {/* {tab === "account" ? <AccountPage /> : <Profile />} */}
      </div>
    </Base>
  );
};

export default Settings;
