export default function Button({action}) {
  const { disabled, handleOnClick = () => {}, label } = action;

  return (
   <button
     onClick= {handleOnClick}
     className="btn mx-1 my-1"
     style={{ backgroundColor: '#21808d', color: "white" }}
     disabled={disabled}
   >
      {label}
   </button>
  )
}

  