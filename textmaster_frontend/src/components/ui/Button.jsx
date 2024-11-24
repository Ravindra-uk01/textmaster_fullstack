import { useState } from "react";

export default function Button({action}) {
  const { disabled, handleOnClick = () => {}, label } = action;
  const [hover, setHover] = useState(false);

  return (
   <button
     onClick= {handleOnClick}
     className="btn mx-1 my-1"
     style={{ backgroundColor: hover ? '#1e6d7c' : '#21808d', color: "white" }}
     disabled={disabled}
     onMouseEnter={() => setHover(true)} // Set hover state to true
     onMouseLeave={() => setHover(false)}
   >
      {label}
   </button>
  )
}

  