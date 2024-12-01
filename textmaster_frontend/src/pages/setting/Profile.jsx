import Settings from "./Settings";
import "./settings.css";

const Profile = () => {
  return (
    <Settings currentTab={"profile"}>
      <div className="main_account_div">
        {/* <SignoutModal
        visible={openSignoutForm}
        onClose={()=>setOpenSignoutForm(false)}
      /> */}
        <div className="profile_div">
           <div>
              <label>First Name</label>
              <input></input>
           </div>
        </div>
      </div>
    </Settings>
  );
};

export default Profile;
