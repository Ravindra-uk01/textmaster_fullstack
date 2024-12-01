import AboutComp from "../../components/AboutComp";
import { ToastContainer } from "react-toastify";
import { FaLink, FaRegBookmark, FaShare, FaUser } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";
import Base from "../base/Base";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const About = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <Base>
      {/* <AboutComp/> */}

      <ToastContainer />
      <div className="home_navbar">
        <div className="home_navbar_div1">
          <div>
            <FaUser size={18} />
            <span className="ms-1"> {user?.display_name || "  Ravindra"}</span>
          </div>
          <div>
            <IoMdTime size={20} />
            <span className="ms-0">1h</span>
          </div>
        </div>
        <div className="home_navbar_div2 fs-5">Textmaster</div>
        <div className="home_navbar_div3">
          <div>
            <IoSettingsOutline size={20} className="sidebar_settings" onClick={()=>navigate('/settings/account')} />
          </div>
        </div>
        {/* <div className="home_navbar_div3">
          <div>
            <BsThreeDots />
          </div>
          <div title="Save to Bookmarks">
            <FaRegBookmark className="fw-bold text-lg" />
          </div>
          <div title="Copy Link">
            <FaLink />
          </div>
          <div>
            <FaShare />
            <span className="ms-1">Share</span>
          </div>
        </div> */}
      </div>

      <div className="small_home_navbar">
        <div className="small_home_navbar_logo">T</div>
        {/* <div className="small_home_navbar_icons" >
          <div>
            <BsThreeDots />
          </div>
          <div title="Save to Bookmarks">
            <FaRegBookmark className="fw-bold text-lg" />
          </div>
          <div title="Copy Link">
            <FaLink />
          </div>
          <div title="Share">
            <FaShare />
          </div>
        </div> */}
      </div>
      <div className="px-2">
        <AboutComp />
      </div>
    </Base>
  );
};

export default About;
