import { Link } from "react-router-dom";
import Base from "../Base/Base";
import "./settings.css"
import { useState } from "react";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { useSelector } from "react-redux";

const UserAccount = () => {
  const [tab, setTab] = useState("account");

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
                <div key={menuItem-idx} className={`setting_navbar-menuItem ${tab == menuItem ? 'active': ""}`} onClick={()=>setTab(menuItem)} >
                    <Link className="capitalize" >{menuItem}</Link>
                </div>
                )
            })
          }
        </div>
      </div>

      <div className="px-2">
        {
          tab === 'account' ? <AccountPage/> : <Profile/> 
        }
      </div>
    </Base>
  );
};

const AccountPage = () => {
  const themeState = useSelector((state) => state.theme);

  return (
    <div className="main_account_div">
      <div className="account_div">
        <div className="account_generalDiv" >
          <h4>General</h4>
          <div className="account_generalDivItems" >
            <div className="account_generalDiv-item" >
              <div className="account_generalDiv-itemHead" >
                <span>Appearance</span>
                <p>How Textmaster looks on your device</p>
              </div>
              <button className="account_general_colorThemeButton" >
                  {
                    themeState.mode === 'light' ? (<div>
                      <MdLightMode />
                      Light
                    </div>) : (
                      <div>
                         <MdDarkMode />
                         Dark
                      </div>
                    )
                  }
              </button>

              <div className="theme" >
                <div>
                  <div>
                    icon
                    light
                  </div>
                  <div>
                    icon 
                    dark
                  </div>
                </div>
              </div>
            </div>
            <div className="account_generalDiv-item" >
              <div className="account_generalDiv-itemHead">
                <span>Language</span>
                <p>The language used in the user interface</p>
              </div>
              <span>custom select</span>
            </div>
            <div className="account_generalDiv-item " >
              <div className="account_generalDiv-itemHead">
                <span>Auto Suggest</span>
                <p>Enable dropdown and tab-complete suggestions while typing a query</p>
              </div>
              <span>custom select</span>
            </div>
          </div>
        </div>
        <div>

        </div>
      </div>

    </div>
  )
}

const Profile = () => {

  return (
    <h1>Profile </h1>
  )
}

export default UserAccount;
