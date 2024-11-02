import { LuLanguages } from "react-icons/lu";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import { registrationSchema } from "../../schemas/authSchema";
import { useState } from "react";
import { Link, useNavigate,  } from "react-router-dom";
import "./login.css";
import "./Signup.css";
import { useDispatch } from "react-redux";
import { addUser } from "../../reducers/userReducer";
import { ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import loginImg5 from "../../assets/loginImages/loginImg5.webp";
import loginImg2 from "../../assets/loginImages/loginImg2.webp";
import loginImg6 from "../../assets/loginImages/loginImg6.webp";

const Signup = () => {

  const [isFocus, setIsFocus] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
  })

  const onSubmit = async(data, e) => {
    console.log(data);
    e.preventDefault();
    try{
      dispatch(addUser(data));
      window.setTimeout(() => {
        navigate('/');
      }, 1500);
    }catch(error){
      console.error('Failed to add user:', error);
    }
  }

  const handleFocus = (name) =>{
    setIsFocus(name)
  }

  const handleBlur = ()=>{
    console.log('heyy')
    setIsFocus('');
  }

  return (
    <div className="login_main-container">
      <ToastContainer />
      <div className="login_container">
        <div className="container_div1">
          {/* <div className="login_heading_content">
            <p className="login_heading_content_logo">Textmaster</p>
            <div className="login_heading_content_language">
              <p><LuLanguages size={20}/> En</p>
            </div>
          </div> */}
          <form className="login_content" onSubmit={handleSubmit(onSubmit)}>
            
            <div className="login_content_msg_div signup_msg_div">
              <span>Welcome to Textmaster</span>
            </div>
    
            {/* <div className="signup_mainDiv"> */}
            <div className="login_input_tags">
              <div className="login_input_tags_div signup_input_tags_div"> 
                <input type="text" name="first_name" id="first_name" {...register("first_name")}  />
                <label className={isFocus == "first_name" ? 'active' : ''} onBlur={handleBlur} onClick={()=>handleFocus('first_name')} >First name</label>
              </div>
              <div className="login_input_tags_div signup_input_tags_div"> 
                <input type="text" name="last_name" id="last_name" {...register("last_name")}  />
                <label className={isFocus == "last_name" ? 'active' : ''} onBlur={handleBlur} onClick={()=>handleFocus('last_name')} >Last name</label>
              </div>
              <div className="login_input_tags_div signup_input_tags_div"> 
                {/* <input type="text" name="email" id="email" {...register("email")} value={formData.email} onChange={handleInputChange} /> */}
                <input type="text" name="email" id="email" {...register("email")}  />
                <label className={isFocus == "email" ? 'active' : ''} onBlur={handleBlur} onClick={()=>handleFocus('email')} >Enter email</label>
              </div>
              <p className="err_msg">{errors.email?.message}</p>
              <div className="login_input_tags_div signup_input_tags_div">
                {/* <input type="password" name="password" id="password" {...register("password")} value={formData.password} onChange={handleInputChange}/> */}
                <input type={isPasswordVisible ? "text" : "password"} name="password" id="password" {...register("password")} />
                <label className={isFocus === "password" ? 'active' : ''} onBlur={handleBlur} onClick={()=>handleFocus('password')} >Enter password</label>
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="toggle-password"
                >
                  {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <p className="err_msg">{errors.password?.message}</p>
              <div className="login_input_tags_div signup_input_tags_div"> 
                <input type={isConfirmPasswordVisible ? "text" : "password"} name="confirm_password" id="confirm_password" {...register("confirm_password")}  />
                <label className={isFocus == "confirm_password" ? 'active' : ''} onBlur={handleBlur} onClick={()=>handleFocus('confirm_password')} >Confirm Password</label>
                <button
                  type="button"
                  onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                  className="toggle-password"
                >
                  {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <Link>forgor password?</Link>
            <button className="btn btn-secondary " type="submit" >Sign Up</button>
            <p>
              Already have an account? <Link to={'/login'} >Login</Link>
            </p>
            {/* </div> */}
          </form>
        </div>

        <div className="container_div2">
          <Splide
            aria-label="Login form images"
            options={{
              autoplay: true,
              rewind: true,
              interaval: 400,
              width: 500,
              height: 500,
              gap: "1rem",
              arrows: false,
              pagination: false,
              perPage: 1,
              speed: 400,
            }}
          >
            <SplideSlide>
              <img
                src={loginImg5}
                alt="login image profile1"
              />
            </SplideSlide>
            <SplideSlide>
              <img
                src={loginImg6}
                alt="login image profile2"
              />
            </SplideSlide>
            <SplideSlide>
              <img
                src={loginImg2}
                alt="login image profile3"
              />
            </SplideSlide>
          </Splide>
        </div>

      </div>
    </div>
  )
}

export default Signup;