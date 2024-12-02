import { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./forgot_password.css";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const toastData = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("reached here ");
      const response = await newRequest.post(`/auth/forget_password`, {
        email,
      });
      console.log("respnse of forgot password is ", response);
      const { status, message } = response.data;
      if (status === "success") {
        toast.success(message, {
          ...toastData,
        });
        setEmail("");
        setMessage(message);
      }
    } catch (error) {
      const { status, message } = error.response.data;
      console.log("error is ", error);
      if (status === "warning") {
        toast.warn(message, {
          ...toastData,
        });
      } else {
        toast.error(message, {
          ...toastData,
        });
      }
    }
  };

  console.log("email is ", email);

  return (
    <div className="fg_password-mainDiv">
      <ToastContainer />
      <div className="fg_password_div">
        <div className="fg_password_backButton" onClick={handleGoBack}>
          <span>
            {" "}
            <FaLongArrowAltLeft /> Back
          </span>
        </div>
        {message === "" ? (
          <>
            <div className="fg_password_Head">
              <h3>Forgot Password</h3>
              <p>
                No worries! Enter your email address below, and we will send you
                a link to reset your password.{" "}
              </p>
            </div>
            <div className="fg_password_body">
              <form onSubmit={handleSubmit} className="fg_password_bodyForm">
                <div className="fg_password_bodyFormEmail">
                  <label>Email</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address here. "
                  />
                </div>

                <button type="submit">Submit</button>
              </form>
            </div>
          </>
        ) : (
          <div className="fg_password_reset_msg" >
            <h3>Password Reset </h3>
            <p>We have sent you an e-mail. Please contact us if you do not receive it within a few minutes.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
