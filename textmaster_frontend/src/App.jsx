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

function App() {

  const {user, loggedIn} = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch, loggedIn]);

  
//   useEffect(() => {
//     const getTokenFromCookies = () => {
//         const value = `; ${document.cookie}`;
//         const parts = value.split(`; token=`);
//         if (parts.length === 2) return parts.pop().split(';').shift();
//     };

//     const token = getTokenFromCookies();
//     if (token) {
//         // Make an API call to fetch user details
//         axios.get(`${API}/auth/user`, { headers: { Authorization: `Bearer ${token}` } })
//             .then(res => {
//                 const { user } = res.data;
//                 dispatch(setProfile(user)); // Update Redux state with user details
//             })
//             .catch(err => {
//                 console.error("Failed to fetch user data:", err);
//             });
//     }
// }, [dispatch]);
 
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/library" element={<Library/>} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/signup" element={<Signup/>} />
        <Route exact path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
