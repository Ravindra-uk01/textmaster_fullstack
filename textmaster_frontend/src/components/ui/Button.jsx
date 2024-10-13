export default function Button({action}) {
  const { disabled, handleOnClick = () => {}, label } = action;

  return (
   <button
     onClick= {handleOnClick}
     className="btn btn-primary mx-1 my-1"
     disabled={disabled}
   >
      {label}
   </button>
  )
}

  