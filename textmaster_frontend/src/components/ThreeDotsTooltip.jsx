import { useEffect, useRef, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import "../styles/threeDotsTooltip.css";
import { FiPlus } from 'react-icons/fi';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from 'react-router-dom';
import newRequest from '../utils/newRequest';
import { setCurrentThread } from '../reducers/threadReducer';
import { useDispatch } from 'react-redux';
import { textActions } from '../store/features/text/textSlice';

const ThreeDotsTooltip = ({children, threadSlug}) => {

    const [isVisible, setIsVisible] = useState(false);
    const tooltipRef = useRef(null);
    const {slug: paramSlug} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const slug = paramSlug || threadSlug;

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
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleAddToSpace = () =>{
        toast.warn("This functionality is under development.", {
            ...toastData
        })
    }

    const handleThreadDelete = async() =>{
        if(!confirm("Are you sure you want to delete this thread?")){
            return;
        }

        try {
            const response = await newRequest.delete(`/thread/slug/${slug}`);
            const {status, message} = response.data;
            if(status === 'success'){
                toast.success(message, {
                    ...toastData
                })
                dispatch(setCurrentThread({}));
                dispatch(textActions.updateText({ text: "" }));
                window.location.reload();
                // navigate('/home');
            }
        } catch (error) {
            const {status, message} = error.response.data;
            if(status === 'warning'){
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

  return (
    <div className='tooltip_mainContainer' >
        <div onClick={()=>setIsVisible(!isVisible)} >{children}</div>
        {
            isVisible && slug && 
             <div className='tooltip_container' ref={tooltipRef} >
                <div onClick={handleAddToSpace} >
                    <FiPlus />
                    <p>Add to Space</p>
                </div>
                <div onClick={handleThreadDelete} >
                    <AiOutlineDelete size={20} />
                    <p>Delete Thread</p>
                </div>
            </div>
        }
    </div>
  )
}

export default ThreeDotsTooltip;