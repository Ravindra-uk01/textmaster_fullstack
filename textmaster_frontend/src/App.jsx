// import logo from './logo.svg';
import "./App.css";
import "./styles/common.css";
import Alert from "./components/Alert";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

function App() {
 
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/signup" element={<Signup/>} />
        <Route exact path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
