import { useState } from "react";
import { FaEye, FaEyeSlash, FaLongArrowAltLeft } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import newRequest from "../../utils/newRequest";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../../schemas/authSchema";

const ResetPassword = () => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const {token} = useParams();
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  const onSubmit = async(data, e) => {
    console.log(data);
    e.preventDefault();
    try{
      const response = await newRequest.patch(`/auth/reset_password/${token}`, data);
      const {status , message} = response.data;
      if(status === 'success'){
        toast.success(message, {
          ...toastData
        })
      }
      window.setTimeout(() => {
        navigate('/home');
      }, 1500);
    }catch(error){
      console.error('Failed to add user:', error);
      const {status, message} = error.response.data;
      if(status === 'warning'){
        toast.warn(message, {
          ...toastData
        })
      }else{
        toast.error(message, {
          ...toastData
        })
      }
    }
  }

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

        <div className="fg_password_Head">
          <h3>Create a New Password</h3>
          <p>
            Enter your new password below to complete the reset process. Ensure it's strong and secure. {" "}
          </p>
        </div>
        <div className="fg_password_body">
          <form onSubmit={handleSubmit(onSubmit)} className="fg_password_bodyForm">
            <div className="fg_password_bodyFormEmail">
              <label>New Password</label>
              <input
                type={isPasswordVisible ? "text" : "password"}

                name="password"
                {...register("password")}
                placeholder="Enter your password here. "
              />
               <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="toggle-password"
                >
                  {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
            <p className="err_msg">{errors.password?.message}</p>
            <div className="fg_password_bodyFormEmail">
              <label>Repeat New Password</label>
              <input
                type={isConfirmPasswordVisible ? "text" : "password"}
                name="confirm_password"
                {...register("confirm_password")}
                placeholder="Enter your password here. "
              />
              <button
                  type="button"
                  onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                  className="toggle-password"
                >
                  {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
            <p className="err_msg">{errors.confirm_password?.message}</p>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
