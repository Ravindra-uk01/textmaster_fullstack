import Navbar from "../../components/Navbar";
import TextForm from "../../components/TextForm";
import Base from "../Base/Base";
import "./home.css";

const Home = () => {
  return (
    <Base>
      {/* <Navbar/>
      <hr/> */}
      <div className="home_navbar">
        <div>
          user details 
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
