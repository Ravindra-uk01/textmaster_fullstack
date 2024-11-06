import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { GrNotes } from "react-icons/gr";
import "../styles/threadLibraryComp.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyThreads } from "../reducers/threadReducer";

const ThreadLibraryComp = () => {

  const {myThreads : {allThreads} } = useSelector((state) => state.thread);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getMyThreads());
  },[dispatch])

  console.log('allThreads are ', allThreads);

  return (
    <div className="thread_library-mainDiv" >
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

        <div>

        </div>
      </div>
    </div>
  );
};

export default ThreadLibraryComp;
