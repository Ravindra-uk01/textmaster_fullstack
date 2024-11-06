import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import newRequest from "../utils/newRequest";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export const getMyThreads = createAsyncThunk(
  "thread/getMyThreads",
  async () => {
    try {
      const response = newRequest.get("/thread");

      const { status, message } = response.data;
      if (status === "success") {
        toast.success(message, { ...toastData });
      } else {
        toast.warn(message, { ...toastData });
      }
      return response.data;
    } catch (error) {

      console.log('error ', error)
      const { status, message } = error.response.data;

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
  }
);

const initialState = {
  myThreads: {
    allThreads: [],
  },
};

const threadReducer = createSlice({
  name: "thread",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyThreads.fulfilled, (state, action) => {
      const { status, allThreads } = action.payload;
      if (status === "success") {
        state.myThreads.allThreads = allThreads;
      }
    });
  },
});

// export const {} = threadReducer.actions;
export default threadReducer.reducer;
