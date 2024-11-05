import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { GrNotes } from "react-icons/gr";
import "../styles/threadLibraryComp.css";

const ThreadLibraryComp = () => {
  return (
    <div className="thread_library" >
        <div className="thread_library-headers" >
            <div className="thread_library-headersName" >
                <GrNotes size={25} />
                <h3>Threads </h3>
            </div>
            <div className="thread_library-headersIcons" >
                <BsThreeDots/>
                <FaPlus />
            </div>
        </div>
        <div>

        </div>
    </div>
  )
}

export default ThreadLibraryComp;