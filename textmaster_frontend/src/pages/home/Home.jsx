import Navbar from "../../components/Navbar";
import TextForm from "../../components/TextForm";
import Base from "../Base/Base";
import { LiaUserCircle } from "react-icons/lia";
import "./home.css";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

const Home = () => {

  const {user} = useSelector(state => state.user);

  console.log('user is ', user);

  return (
    <Base>
      <ToastContainer />
      <div className="home_navbar">
        <div>
          <LiaUserCircle background="grey" size={25} />
          <p>{user?.display_name}</p>
        </div>
        <div>
          content details
        </div>
        <div> 
          extraa work
        </div>
      </div>
      <div className=""> 
        <TextForm />
      </div>
    </Base>
  );
};

export default Home;
