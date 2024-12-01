// import logo from './logo.svg';
import "./App.css";
import "./styles/common.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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

function App() {

  const {user, loggedIn} = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch, loggedIn]);
 
  return (
    <>
      <Routes>
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/home/:slug" element={<Home/>} />
        <Route exact path="/library" element={<Library/>} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/signup" element={<Signup/>} />
        <Route exact path="/settings/account" element={<UserAccount/>} />
        {/* <Route exact path="/settings/profile" element={<Profile/>} /> */}
        <Route exact path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
