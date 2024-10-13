import Alert from "../../components/Alert";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "./base.css";

const Base = ({ children }) => {
  return (
    <div className="container-fluid h-100 rootBody" >
      <div className="h-100" >
        <div className="sidebar">
          <Sidebar/>
        </div>
        <div className="p-0 mainSection">
          <Alert />
          <div className="content ">
            {children}
          </div>
          <div className="footer">
            <Footer/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Base;
