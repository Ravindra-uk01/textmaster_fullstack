import { LuLanguages } from "react-icons/lu";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import { registrationSchema } from "../../schemas/authSchema";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {

  const [isFocus, setIsFocus] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
  })
  const onSubmit = async(data) => {
    console.log(data);
    // const response = await axios.post()
  }

  const handleFocus = (name) =>{
    setIsFocus(name)
  }

  const handleBlur = ()=>{
    console.log('heyy')
    setIsFocus('');
  }

  return (
    <div className="main-container">
      <div className="container">
        <div className="container_div1">
          <div className="login_heading_content">
            <p className="login_heading_content_logo">Textmaster</p>
            <div className="login_heading_content_language">
              <p><LuLanguages size={20}/> En</p>
            </div>
          </div>
          <form className="login_content" onSubmit={handleSubmit(onSubmit)}>
            <div className="login_content_msg_div">
              <span>Welcome to Textmaster</span>
            </div>

            <div className="login_input_tags">
              <div className="login_input_tags_div"> 
                <input type="text" name="first_name" id="first_name" {...register("first_name")}  />
                <label className={isFocus == "first_name" ? 'active' : ''} onBlur={handleBlur} onClick={()=>handleFocus('first_name')} >First name</label>
              </div>
              <div className="login_input_tags_div"> 
                <input type="text" name="last_name" id="last_name" {...register("last_name")}  />
                <label className={isFocus == "last_name" ? 'active' : ''} onBlur={handleBlur} onClick={()=>handleFocus('last_name')} >Last name</label>
              </div>
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
              <div className="login_input_tags_div"> 
                <input type="text" name="confirm_password" id="confirm_password" {...register("confirm_password")}  />
                <label className={isFocus == "confirm_password" ? 'active' : ''} onBlur={handleBlur} onClick={()=>handleFocus('confirm_password')} >Enter email</label>
              </div>
            <Link>forgor password?</Link>
            <button className="btn btn-secondary " type="submit" >Sign Up</button>
            <p>
              Already have an account? <Link to={'/login'} >Login</Link>
            </p>
          </form>
        </div>

        <div className="container_div2"></div>
      </div>
    </div>
  )
}

export default Signup;