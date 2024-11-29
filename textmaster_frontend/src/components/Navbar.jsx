import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import { setDarkTheme, setLightTheme } from "../store/features/theme/themeSlice";

export default function Navbar() {

  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleToggleTheme = ()=>{
    if (theme.mode === 'light') dispatch(setDarkTheme());
    else dispatch(setLightTheme());
  }

  return (
    <nav
      className={`navbar navbar-expand-sm navbar-${theme.mode} `}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          TextMaster
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/about">
                About
              </Link>
            </li>
          </ul>
          <div
            className={`form-check form-switch text-${
              theme.mode === "light" ? "dark" : "light"
            }`}
          >
            <input
              className="form-check-input"
              type="checkbox"
              onClick={handleToggleTheme}
              role="switch"
              id="flexSwitchCheckDefault"
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
             {theme.mode.replace(/\w\S*/g, (match) => match.charAt(0).toUpperCase() + match.slice(1).toLowerCase())} Mode
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
}
