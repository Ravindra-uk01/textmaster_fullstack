import Navbar from "../../components/Navbar";
import TextForm from "../../components/TextForm";
import Base from "../Base/Base";
import { LiaUserCircle } from "react-icons/lia";
import { IoMdTime } from "react-icons/io";
import "./home.css";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { FaLink, FaRegBookmark, FaShare, FaUser, FaUserCircle } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { IoBookmarkOutline, IoBookmarkSharp } from "react-icons/io5";

const Home = () => {
  const { user } = useSelector((state) => state.user);

  console.log("user is ", user);

  return (
    <Base>
      <ToastContainer />
      <div className="home_navbar">
        <div className="home_navbar_div1">
          <div>
            <FaUser size={18} />
            <span className="ms-1"> {user?.display_name || "  Ravindra Rayal"}</span>
          </div>
          <div>
            <IoMdTime size={20} />
            <span className="ms-0" >1h</span>
          </div>
        </div>
        <div className="home_navbar_div2">Title - New Space</div>
        <div className="home_navbar_div3">
          <div><BsThreeDots /></div>
          <div title="Save to Bookmarks" ><FaRegBookmark className="fw-bold text-lg"  /></div>
          <div title="Copy Link" ><FaLink /></div>
          <div>
            <FaShare />
            <span className="ms-1" >Share</span>
          </div>
        </div>
      </div>
      <div className="px-2">
        <TextForm />
      </div>
    </Base>
  );
};

export default Home;
