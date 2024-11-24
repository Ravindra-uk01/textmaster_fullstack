import { Link } from "react-router-dom";
import Base from "../Base/Base";
import "./settings.css"

const UserAccount = () => {
  return (
    <Base>
      <div className="setting_navbar">
        <div className="setting_navbar-heading">
          <h2>Settings</h2>
        </div>
        <div className="setting_navbar-menu">
          {
            ["account", "profile"].map((menuItem, idx) => {

                return (
                <div key={menuItem-idx}>
                    <Link className="capitalize" >{menuItem}</Link>
                </div>
                )
            })
          }
        </div>
      </div>

      <div className="px-2">{/* <TextForm /> */}</div>
    </Base>
  );
};

export default UserAccount;
