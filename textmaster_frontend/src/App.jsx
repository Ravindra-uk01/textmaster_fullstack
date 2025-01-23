// import logo from './logo.svg';
import "./App.css";
import "./styles/common.css";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Library from "./pages/library/Library";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "./reducers/userReducer";
import UserAccount from "./pages/setting/UserAccount";
import Profile from "./pages/setting/Profile";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import ProtectedRoute from "./utils/ProtectedRoute";
import { setTheme } from "./store/features/theme/themeSlice";

function App() {

  const {user, loggedIn} = useSelector(state => state.user);
  const themeState = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  useEffect(() => {
    if(loggedIn)
      dispatch(getProfile());
  }, [dispatch, loggedIn]);

//   useEffect(() => {
//     document.body.setAttribute('data-theme', localStorage.getItem("theme") === "light" ? 'light' : 'dark');
// }, [themeState.mode]);

useEffect(() => {
  document.body.setAttribute('data-theme', themeState.mode);
}, [themeState.mode]);

useEffect(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
      dispatch(setTheme(savedTheme)); 
  }
}, [dispatch]);
 
  return (
    <>
      <Routes>
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/home/:slug" element={<Home/>} />
        <Route exact path="/library" element={<Library/>} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/signup" element={<Signup/>} />
        <Route exact path="/forgot_password" element={<ForgotPassword/>} />
        <Route exact path="/reset_password/:token" element={<ResetPassword/>} />
        <Route exact path="/settings/account" element={<ProtectedRoute> <UserAccount/> </ProtectedRoute> } />
        <Route path="/" element={<Navigate to="/home" replace />} />
        {/* <Route exact path="/settings/profile" element={<Profile/>} /> */}
        <Route exact path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
