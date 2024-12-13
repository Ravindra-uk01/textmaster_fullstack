import "../../styles/loader.css";

const Loader = ({customCss}) => {
  return (
    <div className={`loader ${customCss}`} ></div>
  )
}

export default Loader;