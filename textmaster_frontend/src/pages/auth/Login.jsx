import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { LuLanguages } from "react-icons/lu";
import { useState } from "react";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import { loginSchema } from "../../schemas/authSchema";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setProfile } from "../../reducers/userReducer";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isFocus, setIsFocus] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const API = import.meta.env.VITE_API;
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
    resolver: yupResolver(loginSchema),
  })
  const onSubmit = async(data) => {
    console.log(data);
    try{
      const res = await axios.post(`${API}/auth/login`, data);

      const {status, message, user} = res.data;
      if(status === "success"){
        toast.success(message, { ...toastData });
        dispatch(setProfile(user))
        window.setTimeout(() => {
          navigate('/');
        }, 1500);
      }else{
        toast.warn(message, { ...toastData });
      }

    }catch(err){
      console.log('System Internal Error')
      const {status, message} = err.response.data;
      if (status === "warning") {
        toast.warn(message, {
          ...toastData,
        });
      } else {
        toast.error(message, {
            ...toastData
        })
      }
    }
  }

  const handleFocus = (name) =>{
    setIsFocus(name)
  }

  const handleBlur = ()=>{
    console.log('heyy')
    setIsFocus('');
  }

  // const handleInputChange = (e) =>{
  //   setFormData(prev => ({
  //     ...prev, 
  //     [e.target.name]: e.target.value
  //   }))
  // }


  console.log('isFocus is ', isFocus);
  // console.log('form data is ', formData);

  return (
    <div className="login_main-container">
      <div className="login_container">
        <div className="container_div1">
          <div className="login_heading_content">
            <p className="login_heading_content_logo">Textmaster</p>
            <div className="login_heading_content_language">
              <p><LuLanguages size={16}/> En</p>
            </div>
          </div>
          <form className="login_content" onSubmit={handleSubmit(onSubmit)}>
            <div className="login_content_msg_div">
              <p className="login_content_msg">Hi, there!</p>
              <span>Welcome to Textmaster</span>
            </div>

            <div className="login_input_tags">
              <div className="login_input_tags_div"> 
                {/* <input type="text" name="email" id="email" {...register("email")} value={formData.email} onChange={handleInputChange} /> */}
                <input type="text" name="email" id="email" {...register("email")}  />
                <label className={isFocus == "email" ? 'active' : ''} onBlur={handleBlur} onClick={()=>handleFocus('email')} >Enter email</label>
              </div>
              <p className="err_msg">{errors.email?.message}</p>
              <div className="login_input_tags_div">
                {/* <input type="password" name="password" id="password" {...register("password")} value={formData.password} onChange={handleInputChange}/> */}
                <input type="password" name="password" id="password" {...register("password")} />
                <label className={isFocus === "password" ? 'active' : ''} onBlur={handleBlur} onClick={()=>handleFocus('password')} >Enter password</label>
              </div>
              <p className="err_msg">{errors.password?.message}</p>
            </div>
            <Link>forgor password?</Link>
            <button className="btn btn-secondary " type="submit" >Log In</button>
            <p>
              Don't have an account? <Link to={'/signup'}>Sign up</Link>
            </p>
          </form>
        </div>

        <div className="container_div2"></div>
      </div>
    </div>
  );
};

export default Login;
