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
import { Link } from "react-router-dom";
import { useState } from "react";

const Base = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItem = [
    {
      name: "home",
      link: "/",
      icon: IoHomeOutline,
    },
    {
      name: "about",
      link: "/about",
      icon: BsInfoCircle,
    },
    {
      name: "library",
      link: "/library",
      icon: RiStackLine,
    },
    {
      name: "login",
      link: "/login",
      icon: FiLogIn,
    },
  ];

  return (
    <div className="rootBody">
      {/* <Sidebar/> */}
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebarHead " style={{ width: collapsed ? "auto" : "100%" }} >
          <div
            className="sidebarLogo"
            style={{ display: collapsed ? "flex" : "none" }}
          >
            T
          </div>
          <p
            className="siderbarHeadline"
            style={{ display: collapsed ? "none" : "" }}
          >
            Textmaster
          </p>
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
        >
          New Thread
          <span className="ms-1">
            {" "}
            <BiCommentAdd size={20} />
          </span>
        </div>
        <div className="sidebarMenu">
          {menuItem.map((element, idx) => {
            return (
              <div key={idx} className="siderbarMenuItem">
                <Link style={{ textDecoration: "none" }} to={element.link}>
                  <div className="siderbarMenuItem_div " style={{ justifyContent: collapsed ? "center" : "start" }}>
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

        <div className="sidebar_endDiv" >
          <div style={{ display: collapsed ? "" : "none", justifyContent: collapsed ? "center" :"" }}>
              <div  className="siderbar_expand">
                <BiArrowToRight
                  size={20}
                  color="#454545"
                  title="expand"
                  onClick={() => setCollapsed(false)}
                />
              </div> 
          </div>
          <div style={{ justifyContent: collapsed ? "center" :"" }}>
            
            <span style={{ display: collapsed ? "none" : "" }}>
              <FaUser />
              <span className="ms-2">Ravindra Rayal</span>
            </span>
            <IoSettingsOutline size={20} />
          </div>
          <div style={{ justifyContent: collapsed ? "center" :"" }}>
            <span style={{ display: collapsed ? "none" : "" }}>Contact Me</span>
            <Link
              to="https://x.com/Ravindra_uk01"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiTwitterXLine size={23} />
            </Link>
            <Link
              to="https://www.linkedin.com/in/ravindra-singh-rayal/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: collapsed ? "none" : "" }}
            >
              <FaLinkedinIn size={25} />
            </Link>
            <Link
              to="https://ravindra-uk01.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: collapsed ? "none" : "" }}
            >
              <GiCircleCage size={25} />
            </Link>
            {/* <RiTwitterXLine />
            <FaLinkedinIn />
            <GiCircleCage /> */}
          </div>
        </div>
      </div>

      <div className={`p-0 mainSection ${collapsed ? "collapsed" : ""}`}>
        <Alert />
        <div className="content ">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Base;
