import Alert from "../../components/Alert";
import Footer from "../../components/Footer";
import { BiArrowToLeft, BiArrowToRight, BiCommentAdd } from "react-icons/bi";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { BsInfoCircle } from "react-icons/bs";
import { RiStackLine, RiTwitterXLine } from "react-icons/ri";
import { FiLogIn } from "react-icons/fi";
import { FaLinkedinIn, FaUser } from "react-icons/fa";
import { GiCircleCage } from "react-icons/gi";

import "./base.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const Base = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, loggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const menuItem = [
    {
      name: "home",
      link: "/home",
      icon: IoHomeOutline,
    },
    {
      name: "library",
      link: "/library",
      icon: RiStackLine,
    },
    {
      name: "about",
      link: "/about",
      icon: BsInfoCircle,
    },
    {
      name: "login",
      link: "/login",
      icon: FiLogIn,
    },
  ];

  return (
    <div className="rootBody">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div
          className="sidebarHead "
          style={{ width: collapsed ? "auto" : "100%" }}
        >
          <Link
            to={"/home"}
            style={{
              textDecoration: "none",
              display: collapsed ? "flex" : "none",
            }}
          >
            <div
              className="sidebarLogo"
              style={{ display: collapsed ? "flex" : "none" }}
            >
              T
            </div>
          </Link>

          <Link
            to={"/home"}
            style={{ textDecoration: "none", display: collapsed ? "none" : "" }}
          >
            <p className="siderbarHeadline">Textmaster</p>
          </Link>
          <p style={{ display: collapsed ? "none" : "" }}>
            <BiArrowToLeft
              size={20}
              color="#454545"
              title="collapse"
              onClick={() => setCollapsed(true)}
            />
          </p>
        </div>

        <div
          className="sidebarNewThread"
          style={{ display: collapsed ? "none" : "" }}
          onClick={() => navigate("/home")}
        >
          New Thread
          <span className="ms-1">
            {" "}
            <BiCommentAdd size={20} />
          </span>
        </div>
        <div className="sidebarMenu">
          {menuItem.map((element, idx) => {
            if (element.name === "login" && loggedIn) return null;
            return (
              <div key={idx} className="siderbarMenuItem">
                <Link style={{ textDecoration: "none" }} to={element.link}>
                  <div
                    className="siderbarMenuItem_div "
                    style={{ justifyContent: collapsed ? "center" : "start" }}
                  >
                    <span>
                      <element.icon size={25} />
                    </span>
                    <span
                      className="capitalize"
                      style={{ display: collapsed ? "none" : "" }}
                    >
                      {element.name}
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {loggedIn ? (
          <div className="sidebar_endDiv">
            <div
              style={{
                display: collapsed ? "" : "none",
                justifyContent: collapsed ? "center" : "",
              }}
            >
              <div className="siderbar_expand">
                <BiArrowToRight
                  size={20}
                  color="#454545"
                  title="expand"
                  onClick={() => setCollapsed(false)}
                />
              </div>
            </div>
            <div style={{ justifyContent: collapsed ? "center" : "" }}>
              <span
                style={{ display: collapsed ? "none" : "" }}
                className="sidebar_user"
              >
                <FaUser />
                <span className="ms-2 capitalize">
                  {user.first_name
                    ? user?.first_name + " " + user?.last_name?.charAt(0) + "."
                    : "User@9556"}
                </span>
              </span>
              <IoSettingsOutline
                size={20}
                className="sidebar_settings"
                onClick={() => navigate("/settings/account")}
              />
            </div>
            <div style={{ justifyContent: collapsed ? "center" : "" }}>
              <span style={{ display: collapsed ? "none" : "" }}>
                Contact Me
              </span>
              <div className="sidebar_contactMe-Icons">
                <Link
                  to="https://x.com/Ravindra_uk01"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <RiTwitterXLine size={20} />
                </Link>
                <Link
                  to="https://www.linkedin.com/in/ravindra-singh-rayal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: collapsed ? "none" : "" }}
                >
                  <FaLinkedinIn size={20} />
                </Link>
                <Link
                  to="https://ravindra-uk01.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: collapsed ? "none" : "" }}
                >
                  <GiCircleCage size={20} />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="sidebar_endDiv2 ">
            <div
              className="sidebar_loginDiv"
              onClick={() => navigate("/login")}
            >
              Login
            </div>
            <div
              className="siderbar_signupDiv"
              onClick={() => navigate("/signup")}
            >
              SignUp
            </div>
          </div>
        )}
      </div>

      <div className={`p-0 mainSection ${collapsed ? "collapsed" : ""}`}>
        <Alert />
        <div className="content ">{children}</div>
        <Footer />
      </div>

      {/* bottom sidebar for smaller screens  */}
      <div className="bottomSidebar">
        {menuItem.map((element, idx) => {
          if (element.name === "login" && loggedIn) return null;
          return (
            <div key={idx} className="bottomSiderbarMenuItem">
              <Link style={{ textDecoration: "none" }} to={element.link}>
                <div className="bottomSiderbarMenuItem_div ">
                  <span>
                    <element.icon size={25} />
                  </span>
                  <span className="capitalize ">{element.name}</span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Base;
