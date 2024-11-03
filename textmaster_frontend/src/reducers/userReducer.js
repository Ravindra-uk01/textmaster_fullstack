import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export const addUser = createAsyncThunk("user/addUser", async (data) => {
  try {
    const response = await axios.post(`${API}/auth/signup`, data );

    const { status, message } = response.data;
    if (status === "success") {
      toast.success(message, { ...toastData });
    } else {
      toast.warn(message, { ...toastData });
    }
    return response.data;
  } catch (error) {
    const { status, message } = error.response.data;

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
});

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async() => {
    try {
      const response = await axios.get(`${API}/auth/getProfile`, {withCredentials: true});
      return response.data;
    } catch (error) {
      console.log('System Internal Error', error)
    }
  }
) 

const initialState = {
  loggedIn: false,
  user: {},
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action)=>{
      const {user} = action.payload;
      console.log('user is frontend reducer', user);
      state.user = user;
      state.loggedIn = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addUser.fulfilled , (state, action) => {
        const {status, user} = action.payload;
        if(status === "success"){
            state.user = user;
            state.loggedIn = true;
        }
    })
    builder.addCase(getProfile.fulfilled, (state, action) => {
        const {status, user} = action.payload;
        if(status == "success"){
          state.user = user;
          state.loggedIn = true;
        }
    })
  },
});

export const {setProfile} = userReducer.actions;
export default userReducer.reducer;
