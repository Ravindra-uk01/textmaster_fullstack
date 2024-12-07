import { BsThreeDots } from "react-icons/bs";
import { FaBookmark, FaPlus, FaRegBookmark, FaRegCircleCheck } from "react-icons/fa6";
import { GrNotes } from "react-icons/gr";
import "../styles/threadLibraryComp.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMyThreads, toggleThreadBookmarkStatus } from "../reducers/threadReducer";
import { IoMdTime } from "react-icons/io";
import { IoBookmarks } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { timesAgo } from "../utils/dateFormat";
import { useNavigate } from "react-router-dom";
import NoDataFound from "../utils/NoDataFound";
import ModalForm from "./modals/ModalForm";
import newRequest from "../utils/newRequest";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThreeDotsTooltip from "./ThreeDotsTooltip";
import { BiBookmarkPlus } from "react-icons/bi";

const ThreadLibraryComp = () => {
  const {
    myThreads: { allThreads , search},
  } = useSelector((state) => state.thread);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModelForm, setShowModelForm] = useState(false);
  const [threadType, setThreadType] = useState("all");
  const [filter, setFilter] = useState("")

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
    dispatch(getMyThreads(search, filter));
  }, [dispatch, filter, search ]);

  const deleteAllThreads = async () => {
    try {
      if (
        confirm(
          `All your ${
            threadType === "all" ? "" : "Bookmarked "
          } threads will be deleted. This cannot be undone.`
        )
      ) {
        const response = await newRequest.delete(
          `/thread/threadType/${threadType}`
        );
        const { status, message } = response.data;
        if (status === "success") {
          toast.success(message, {
            ...toastData,
          });
          setThreadType("all");
          window.location.reload();
        }
      }
    } catch (error) {
      console.log("error is ", error);
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

  const handleThreadFilterBookmark = () => {
    if(filter === ''){
      setFilter("bookmarked");
      dispatch(getMyThreads("bookmarked"))
    }else{
      setFilter("");
      dispatch(getMyThreads(""))
    }
  }

  const handleThreadBookmark = async (slug) => {
    if (!confirm("Are you sure you want to change the bookmark status?"))
      return;

    dispatch(toggleThreadBookmarkStatus({slug}))
  };

  console.log("allThreads are ", allThreads);
  console.log("search value  is ", search);

  return (
    <div className="thread_library-mainDiv">
      <ModalForm
        visible={showModelForm}
        onClose={() => setShowModelForm(false)}
        onSubmit={() => deleteAllThreads()}
        title="Delete Threads"
        confirmText={"Delete Threads"}
      >
        <div className="threadLibrary_ModelContent">
          <div onClick={() => setThreadType("all")}>
            <p
              className={`tl_modalHeading ${
                threadType === "all" ? "active" : ""
              }`}
            >
              <span>All Threads</span>
              {threadType === "all" ? <FaRegCircleCheck /> : ""}
            </p>
            <p className="tl_modelHeadingDesc">
              All your threads will be deleted.{" "}
            </p>
          </div>
          <div onClick={() => setThreadType("unBookmarked")}>
            <p
              className={`tl_modalHeading ${
                threadType === "unBookmarked" ? "active" : ""
              }`}
            >
              <span>Unbookmarked Threads</span>
              {threadType === "unBookmarked" ? <FaRegCircleCheck /> : ""}
            </p>
            <p className="tl_modelHeadingDesc">
              All unbookmarked threads will be permanently deleted.{" "}
            </p>
          </div>
        </div>
      </ModalForm>
      <div className="thread_library">
        <div className="thread_library-headers">
          <div className="thread_library-headersName">
            {/* <GrNotes size={18} /> */}
            <h4>Threads {filter === 'bookmarked' ? "(Bookmarked)" : ""}  </h4>
          </div>
          <div className="thread_library-headersIcons">
            <div onClick={()=>handleThreadFilterBookmark()} >
            {filter === 'bookmarked' ? (
              <FaBookmark
                title="Bookmarked"
                className="fw-bold text-lg"
              />
            ) : (
              <FaRegBookmark
                title="Not Bookmarked"
                className="fw-bold text-lg"
              />
            )}
            </div>
            <div onClick={() => setShowModelForm(true)}>
              <BsThreeDots />
            </div>
            <div onClick={() => navigate("/home")}>
              <FaPlus />
            </div>
          </div>
        </div>

        <div className="thread_library-content">
          {allThreads && allThreads.length > 0 ? (
            allThreads.map((thread) => {
              return (
                <div key={thread._id} className="thread_library-item">
                  <div onClick={() => navigate(`/home/${thread?.slug}`)}>
                    <div className="thread_library-itemtTitle capitalize ">
                      {thread.title}
                    </div>
                    <div className="thread_library-itemDescription">
                      {thread.description}
                    </div>
                  </div>
                  <div className="thread_library-itemDetails">
                    <div className="thread_library-itemcreationTime">
                      <IoMdTime size={20} />
                      <span className="ms-0">
                        {" "}
                        {timesAgo(new Date(thread.createdAt))}{" "}
                      </span>
                    </div>
                    <div className="thread_library-itemDetailIcons">
                      {thread.bookmarked ? (
                        <div className="thread_library-itemBookmarkIcon" onClick={()=> handleThreadBookmark(thread.slug) }  >
                          <IoBookmarks />
                          <p>Bookmarks</p>
                        </div>
                      ) : (
                        <div className="thread_library-menuIcons" onClick={()=> handleThreadBookmark(thread.slug) }  >
                          <BiBookmarkPlus size={18} title="Not Bookmarked" />
                        </div>
                      )}

                      <div className="thread_library-menuIcons">
                        <ThreeDotsTooltip threadSlug={thread.slug} >
                          <BsThreeDots size={16} />
                        </ThreeDotsTooltip>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <NoDataFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default ThreadLibraryComp;
