
import "./settings.css";
import { useEffect, useRef, useState } from "react";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  setDarkTheme,
  setLightTheme,
} from "../../store/features/theme/themeSlice.js";
import Switch from "../../components/ui/Switch";
import SignoutModal from "../../components/modals/SignoutModal";
import Settings from "./Settings";

const UserAccount = () => {
 
  const themeState = useSelector((state) => state.theme);
  const {user} = useSelector((state) => state.user);
  const [themeOpen, setThemeOpen] = useState(false);
  const [autoSuggest, setAutoSuggest] = useState(false);
  const [openSignoutForm, setOpenSignoutForm] = useState(false);
  const themeRef = useRef(null);
  const dispatch = useDispatch();

  const toggleThemeOptions = (event) => {
    event.stopPropagation();
    setThemeOpen((prev) => !prev);
  };

  const handleOutsideClick = (e) => {
    if (themeRef.current && !themeRef.current.contains(e.target)) {
      setThemeOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleToggleTheme = (mode) => {
    if (mode === "light") dispatch(setLightTheme());
    else dispatch(setDarkTheme());
  };

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };

  useEffect(() => {
    const existingScript = document.getElementById("google-translate-script");
    if (!existingScript) {
      const addScript = document.createElement("script");
      addScript.setAttribute(
        "src",
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      addScript.id = "google-translate-script";
      document.body.appendChild(addScript);

      window.googleTranslateElementInit = googleTranslateElementInit;
    } else {
      window.googleTranslateElementInit = googleTranslateElementInit;
    }

    // Cleanup function to remove the script on component unmount
    return () => {
      if (existingScript) {
        document.body.removeChild(existingScript);
        window.googleTranslateElementInit = undefined; 
      }
    };
  }, []);

  // console.log("themeopen is ", themeOpen);
  // console.log('openSignoutForm is ', openSignoutForm)

  return (
    <Settings currentTab={"account"} >
      <div className="main_account_div">
      <SignoutModal
        visible={openSignoutForm}
        onClose={()=>setOpenSignoutForm(false)}
      />
      <div className="account_div">
        <div className="account_generalDiv">
          <h4>General</h4>
          <div className="account_generalDivItems">
            <div className="account_generalDiv-item">
              <div className="account_generalDiv-itemHead">
                <span>Appearance</span>
                <p>How Textmaster looks on your device</p>
              </div>
              <button
                className="account_general_colorThemeButton"
                onClick={toggleThemeOptions}
                aria-expanded={themeOpen}
              >
                {themeState.mode === "light" ? (
                  <div>
                    <MdLightMode />
                    Light
                  </div>
                ) : (
                  <div>
                    <MdDarkMode />
                    Dark
                  </div>
                )}
              </button>

              {themeOpen && (
                <div
                  className={`account_general_themeOuterDiv ${
                    themeOpen ? "active" : ""
                  } `}
                  ref={themeRef}
                >
                  <div className="account_general_themeMainDiv">
                    <div
                      className="account_general_themeMainDivItem"
                      onClick={()=>handleToggleTheme("light")}
                    >
                      <MdLightMode />
                      Light
                    </div>
                    <div
                      className="account_general_themeMainDivItem"
                      onClick={()=>handleToggleTheme("dark")}
                    >
                      <MdDarkMode />
                      Dark
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="account_generalDiv-item">
              <div className="account_generalDiv-itemHead">
                <span>Language</span>
                <p>The language used in the user interface</p>
              </div>
              <div>
                <div id="google_translate_element"></div>
              </div>
            </div>
            <div className="account_generalDiv-item ">
              <div className="account_generalDiv-itemHead">
                <span>Auto Suggest</span>
                <p>
                  Enable dropdown and tab-complete suggestions while typing a
                  query
                </p>
              </div>
              <div>
                <Switch
                  value={autoSuggest}
                  onChange={() => setAutoSuggest(!autoSuggest)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="account_systemDiv" >
          <h4>System</h4>
          <div className="account_generalDivItems">
            <div className="account_generalDiv-item">
              <div className="account_generalDiv-itemHead">
                <span>Active Account</span>
                <p>{`You are signed in as ${user.email} `}</p>
              </div>
              <button className="account_general_colorThemeButton" onClick={()=>setOpenSignoutForm(true)} > Sign out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Settings>
  );
};

// const AccountPage = () => {
 

//   return (
    
//   );
// };

// const Profile = () => {
//   return <h1>Profile </h1>;
// };

export default UserAccount;
