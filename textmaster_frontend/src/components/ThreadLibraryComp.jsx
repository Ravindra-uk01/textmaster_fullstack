import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { GrNotes } from "react-icons/gr";
import "../styles/threadLibraryComp.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyThreads } from "../reducers/threadReducer";
import { IoMdTime } from "react-icons/io";
import { IoBookmarks } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { timesAgo } from "../utils/dateFormat";
import { useNavigate } from "react-router-dom";
import NoDataFound from "../utils/NoDataFound";

const ThreadLibraryComp = () => {

  const { myThreads: { allThreads }, } = useSelector((state) => state.thread);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMyThreads());
  }, [dispatch]);

  console.log("allThreads are ", allThreads);

  return (
    <div className="thread_library-mainDiv">
      <div className="thread_library">
        <div className="thread_library-headers">
          <div className="thread_library-headersName">
            <GrNotes size={20} />
            <h3>Threads </h3>
          </div>
          <div className="thread_library-headersIcons">
            <div>
              <BsThreeDots />
            </div>
            <div>
              <FaPlus />
            </div>
          </div>
        </div>

        <div className="thread_library-content">
          {(allThreads && allThreads.length > 0) ? 
            allThreads.map((thread) => {
              return (
                <div key={thread._id} className="thread_library-item">
                  <div onClick={()=>navigate(`/home/${thread?.slug}`)} >
                    <div className="thread_library-itemtTitle capitalize ">{thread.title}</div>
                    <div className="thread_library-itemDescription" >{thread.description}</div>
                  </div>
                  <div className="thread_library-itemDetails" >
                    <div className="thread_library-itemcreationTime" >
                      <IoMdTime size={20} />
                      <span className="ms-0"> {timesAgo(new Date(thread.createdAt))} </span>
                    </div>
                    <div className="thread_library-itemDetailIcons">
                      {thread.bookmarked ? (
                        <div className="thread_library-itemBookmarkIcon" > 
                          <IoBookmarks />
                          <p>Bookmarks</p>  
                        </div>
                      ) : (
                        <div className="thread_library-menuIcons" >
                          <GoPlus size={18} />
                        </div>
                      )}

                      <div className="thread_library-menuIcons" >
                        <BsThreeDots size={15} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
            : 
             <NoDataFound/>
          }
        </div>
      </div>
    </div>
  );
};

export default ThreadLibraryComp;
