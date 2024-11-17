import Navbar from "../../components/Navbar";
import TextForm from "../../components/TextForm";
import Base from "../Base/Base";
import { LiaUserCircle } from "react-icons/lia";
import { IoMdTime } from "react-icons/io";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  FaLink,
  FaRegBookmark,
  FaShare,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { IoBookmarkOutline, IoBookmarkSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getThreadById } from "../../reducers/threadReducer";
import { timesAgoShort } from "../../utils/dateFormat";

const Home = () => {

  const { user } = useSelector((state) => state.user);
  const { currentThread } = useSelector((state) => state.thread);
  const {slug} = useParams();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(slug){
      dispatch(getThreadById({slug}));
    }
  },[slug, dispatch])

  return (
    <Base>
      <ToastContainer />
      <div className="home_navbar">
        <div className="home_navbar_div1">
          <div>
            <FaUser size={18} />
            <span className="ms-1 capitalize">
              {" "}
              {user?.display_name || "User@9556"}
            </span>
          </div>
          <div>
            <IoMdTime size={20} />
            <span className="ms-0">{currentThread.createdAt ? timesAgoShort(new Date(currentThread.createdAt)) : "1h"}</span>
          </div>
        </div>
        <div className="home_navbar_div2">Title - {currentThread.title ? currentThread.title : "New Space"}</div>
        <div className="home_navbar_div3">
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
        </div>
      </div>

      <div className="small_home_navbar">
        <div className="small_home_navbar_logo" >T</div>
        <div className="small_home_navbar_icons" >
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
        </div>
      </div>
      <div className="px-2">
        <TextForm />
      </div>
    </Base>
  );
};

export default Home;
