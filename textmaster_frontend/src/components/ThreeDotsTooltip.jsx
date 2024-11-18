import { useEffect, useRef, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import "../styles/threeDotsTooltip.css";
import { FiPlus } from 'react-icons/fi';

const ThreeDotsTooltip = ({children}) => {

    const [isVisible, setIsVisible] = useState(false);
    const tooltipRef = useRef(null);

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


  return (
    <div className='tooltip_mainContainer' >
        <div onClick={()=>setIsVisible(!isVisible)} >{children}</div>
        {
            isVisible &&
             <div className='tooltip_container' ref={tooltipRef} >
                <div>
                    <FiPlus />
                    <p>Add to Space</p>
                </div>
                <div >
                    <AiOutlineDelete size={20} />
                    <p>Delete Thread</p>
                </div>
            </div>
        }
    </div>
  )
}

export default ThreeDotsTooltip;