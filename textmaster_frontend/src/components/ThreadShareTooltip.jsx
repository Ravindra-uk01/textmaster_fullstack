import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import newRequest from "../utils/newRequest";
import { GoLock } from "react-icons/go";
import { FaFacebook, FaLock, FaShare, FaWhatsapp } from "react-icons/fa";
import "../styles/threadShareTooltip.css";
import { FaRegCircleCheck, FaXTwitter } from "react-icons/fa6";
import { LuClipboardCheck } from "react-icons/lu";
import { HiLink } from "react-icons/hi";
import { updateThreadVisibility } from "../reducers/threadReducer";

const ThreadShareTooltip = ({ children }) => {
  const { currentThread } = useSelector((state) => state.thread);
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleClickOutside = (event) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleThreadVisibility = async (value) => {
    dispatch(updateThreadVisibility({ slug, visibility: value }));
  };

  console.log("current thread ", currentThread);

  return (
    <div className="tooltip_mainContainer">
      <div onClick={() => setIsVisible(!isVisible)}>{children}</div>
      {isVisible && slug && (
        <div className="tooltip_container2" ref={tooltipRef}>
          <h5>View Access</h5>
          <div className="tooltip_shareContent">
            <div
              className="tooltip_shareContent-secret"
              onClick={() => handleThreadVisibility("me")}
            >
              <p
                className={`tooltip_shareContent-heading ${
                  currentThread.visibility === "me" ? "active" : ""
                }`}
              >
                <span>
                  {" "}
                  <FaLock /> Secret{" "}
                </span>
                {currentThread.visibility === "me" ? <FaRegCircleCheck /> : ""}
              </p>
              <p className="tooltip_desc">Only Author can view.</p>
            </div>
            <div
              className="tooltip_shareContent-shareable"
              onClick={() => handleThreadVisibility("everyone")}
            >
              <p
                className={`tooltip_shareContent-heading ${
                  currentThread.visibility === "everyone" ? "active" : ""
                } `}
              >
                {" "}
                <span>
                  {" "}
                  <FaShare /> Shareble{" "}
                </span>
                {currentThread.visibility === "everyone" ? (
                  <FaRegCircleCheck />
                ) : (
                  ""
                )}{" "}
              </p>
              <p className="tooltip_desc">Anyone with this link can view.</p>
            </div>
          </div>
          <p className="tooltip_linkCopied">
            {" "}
            <LuClipboardCheck />
            Link copied
          </p>

          {currentThread.visibility === "everyone" && (
            <div>
              <h5>Share</h5>
              <div className="tooltip_shareSocial">
                <div>
                  <Link
                    to="https://x.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <FaXTwitter />
                    Twitter
                  </Link>
                </div>
                <div>
                  <HiLink /> Copy Link
                </div>
                <div>
                  <Link
                    to="https://www.whatsapp.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <FaWhatsapp /> Whatsapp
                  </Link>
                </div>
                <div>
                  <Link
                    to="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <FaFacebook />
                    Facebook
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ThreadShareTooltip;
