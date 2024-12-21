import axios from "axios";
import "./threadModal.css";
import newRequest from "../../utils/newRequest";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom";

const ThreadModal = ({ visible, onClose, threadData, setThreadData }) => {
  if (!visible) return null;

  const {slug} = useParams();
  const navigate = useNavigate();

  const toastData = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setThreadData((prev) => ({
      ...prev,
      [name]: name === 'bookmarked' ? value === 'true' : value,
    }));
  };

  const handleSubmit = async(e) => {
    try {
      e.preventDefault();
      console.log('ready to submit');
      const response = await newRequest.post('/thread', threadData);

      const {status , message , slug } = response.data;
      if(status === 'success'){
         toast.success(message, {
            ...toastData
         })
         navigate(`/home/${slug}`);

         onClose();
      }else {
        toast.warn(message, {
          ...toastData
        })
      }

    } catch (error) {
      console.log('error is ', error);
      const {status , message } = error.response.data;
      if(status === "warning"){
        toast.warn(message, {
          ...toastData
        })
      }else{
        toast.error(message, {
          ...toastData
        })
      }
    }
  };

  const updateThread = async(e) => {
    try {
      e.preventDefault();
      console.log('came to update part ');
      const response = await newRequest.patch(`/thread/slug/${slug}`, threadData);

      const {status , message } = response.data;
      if(status === 'success'){
         toast.success(message, {
            ...toastData
         })

         setThreadData({
          title: "",
          description: "",
          bookmarked: false,

         })

         onClose();
      }else {
        toast.warn(message, {
          ...toastData
        })
      }

    } catch (error) {
      const {status , message } = error.response.data;
      if(status === "warning"){
        toast.warn(message, {
          ...toastData
        })
      }else{
        toast.error(message, {
          ...toastData
        })
      }
    }
  }

  console.log("thread data is ", threadData);
  console.log('slug in model ', slug);

  return (  
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header" >
          <h4> Thread Details</h4>
          <div className="close-button" onClick={onClose}>
            X
          </div>
        </div>

        <form onSubmit={ slug ? updateThread : handleSubmit} className="threadModal_form" >
          <div className="modal_title">
            <label htmlFor="title" >Title</label>
            <input type="text" name="title" value={threadData.title} onChange={handleInputChange} required  />
          </div>
          <div className="modal_bookmark">
            <span>Bookmark</span>
            <label>
                <input
                type="radio"
                name="bookmarked"
                value={"true"}
                checked={threadData.bookmarked === true}
                onChange={handleInputChange}
                />
                Yes
            </label> 

            <label>
                <input
                type="radio"
                name="bookmarked"
                value={"false"}
                checked={threadData.bookmarked === false}
                onChange={handleInputChange}
                />
                No
            </label>
          </div>

          <div className="threadModal_button" >
            <button type="button" onClick={onClose}>Close</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ThreadModal;
