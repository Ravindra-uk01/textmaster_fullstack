import Navbar from "../../components/Navbar";
import TextForm from "../../components/TextForm";
import Base from "../base/Base";
import { LiaUserCircle } from "react-icons/lia";
import { IoMdCheckmarkCircle, IoMdTime } from "react-icons/io";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import {
  FaBookmark,
  FaLink,
  FaLock,
  FaRegBookmark,
  FaShare,
  FaUser,
} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import {  useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  clearCurrentThread,
  getThreadById,
  setCurrentThread,
} from "../../reducers/threadReducer";
import { timesAgoShort } from "../../utils/dateFormat";
import ThreeDotsTooltip from "../../components/ThreeDotsTooltip";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import newRequest from "../../utils/newRequest";
import ThreadShareTooltip from "../../components/ThreadShareTooltip";
import { textActions } from "../../store/features/text/textSlice";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const { currentThread } = useSelector((state) => state.thread);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [copyLink, setCopyLink] = useState("");
  const toastData = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  useEffect(() => {
    if (slug) {
      dispatch(getThreadById({ slug }));
    } else {
      dispatch(clearCurrentThread());
      dispatch(textActions.updateText({ text: "" }));
    }
  }, [slug, dispatch]);

  const handleThreadBookmark = async () => {
    console.log("this is from bookmark");
    if (!confirm("Are you sure you want to change the bookmark status?"))
      return;

    try {
      const response = await newRequest.patch(
        `/thread/toggle_bookmark/slug/${slug}`,
        {}
      );
      const { status, message, thread } = response.data;
      if (status === "success") {
        toast.success(message, {
          ...toastData,
        });
        dispatch(setCurrentThread(thread));
      }
    } catch (error) {
      const { status, message } = error.response.data;
      if (status === "warning") {
        toast.warn(message, {
          ...toastData,
        });
      } else {
        toast.error(message, {
          ...toastData,
        });
      }
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyLink(window.location.href);
      alert("URL copied to clipboard!"); // Feedback for the user
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <Base>
      <div className="home_navbar">
        <div className="home_navbar_div1">
          {user.loggedIn && <div>
            <FaUser size={18} />
            <span className="ms-1 capitalize">
              {" "}
              {user?.display_name || ""}
            </span>
          </div>}
          <div>
            <IoMdTime size={20} />
            <span className="ms-1">
              {currentThread.createdAt
                ? timesAgoShort(new Date(currentThread.createdAt))
                : "1h"}
            </span>
          </div>
        </div>
        <div className="home_navbar_div2">
          Title - {currentThread.title ? currentThread.title : "New Space"}
        </div>
        <div className="home_navbar_div3">
          <ThreeDotsTooltip>
            <div
              className="home_navbar_div3Icons"
              title={
                slug
                  ? ""
                  : "Please add the thread before accessing this feature."
              }
              style={{
                cursor: slug ? "pointer" : "not-allowed",
                opacity: slug ? 1 : 0.5,
              }}
            >
              <BsThreeDots />
            </div>
          </ThreeDotsTooltip>
          <div
            className="home_navbar_div3Icons"
            title={
              slug ? "" : "Please add the thread before accessing this feature."
            }
            style={{
              cursor: slug ? "pointer" : "not-allowed",
              opacity: slug ? 1 : 0.5,
            }}
            onClick={slug ? handleThreadBookmark : undefined}
          >
            {currentThread?.bookmarked ? (
              <FaBookmark title="Bookmarked" className="fw-bold text-lg" />
            ) : (
              <FaRegBookmark
                title="Not Bookmarked"
                className="fw-bold text-lg"
              />
            )}
          </div>
          {currentThread.visibility === "everyone" && (
            <div
              className="home_navbar_div3Icons"
              title={
                slug
                  ? "Copy Link"
                  : "Please add the thread before accessing this feature."
              }
              style={{
                cursor: slug ? "pointer" : "not-allowed",
                opacity: slug ? 1 : 0.5,
              }}
              onClick={slug ? copyToClipboard : undefined}
            >
              {copyLink ? (
                <IoMdCheckmarkCircle size={18} />
              ) : (
                <FaLink disabled={!slug} />
              )}
            </div>
          )}

          <ThreadShareTooltip>
            <div
              className="home_navbar_div3Icons"
              title={
                slug
                  ? ""
                  : "Please add the thread before accessing this feature."
              }
              style={{
                cursor: slug ? "pointer" : "not-allowed",
                opacity: slug ? 1 : 0.5,
              }}
            >
              <span>
                {currentThread.visibility === "me" ? <FaLock /> : <FaShare />}
                Share
              </span>
            </div>
          </ThreadShareTooltip>
        </div>
      </div>

      <div className="small_home_navbar">
        <div className="small_home_navbar_logo">T</div>
        <div className={`small_home_navbar_icons ${slug ? "withSlug" : ""} `}>
          <ThreeDotsTooltip>
            <div
              className="small_home_navbar_iconsDiv"
              title={
                slug
                  ? ""
                  : "Please add the thread before accessing this feature."
              }
            >
              <BsThreeDots />
            </div>
          </ThreeDotsTooltip>
          <div
            className="small_home_navbar_iconsDiv"
            title={
              slug ? "" : "Please add the thread before accessing this feature."
            }
            onClick={slug ? handleThreadBookmark : undefined}
          >
            {currentThread?.bookmarked ? (
              <FaBookmark title="Bookmarked" className="fw-bold text-lg" />
            ) : (
              <FaRegBookmark
                title="Not Bookmarked"
                className="fw-bold text-lg"
              />
            )}
          </div>

          {currentThread.visibility === "everyone" && (
            <div
              className="small_home_navbar_iconsDiv"
              title={
                slug
                  ? "Copy Link"
                  : "Please add the thread before accessing this feature."
              }
              onClick={slug ? copyToClipboard : undefined}
            >
              {copyLink ? (
                <IoMdCheckmarkCircle size={18} />
              ) : (
                <FaLink disabled={!slug} />
              )}
            </div>
          )}
          
          <ThreadShareTooltip>
            <div
              className="small_home_navbar_iconsDiv"
              title={
                slug
                  ? ""
                  : "Please add the thread before accessing this feature."
              }
            >
              <span>
                {currentThread.visibility === "me" ? <FaLock /> : <FaShare />}
              </span>
            </div>
          </ThreadShareTooltip>
        </div>
      </div>
      <div className="px-2 scrollableContent ">
        <TextForm />
      </div>
    </Base>
  );
};

export default Home;
