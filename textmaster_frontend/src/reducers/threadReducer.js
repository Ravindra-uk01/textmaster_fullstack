import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import newRequest from "../utils/newRequest";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastData = {
  position: "top-right",
  autoClose: 2000,
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
      const response = await newRequest.get("/thread");

      // const { status, message } = response.data;
      // if (status === "success") {
      //   toast.success(message, { ...toastData });
      // } else {
      //   toast.warn(message, { ...toastData });
      // }
      return response.data;
    } catch (error) {
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

export const getThreadById = createAsyncThunk(
  "thread/getThreadById",
  async({slug}) => {
    try {
      const response = await newRequest.get(`/thread/slug/${slug}`);
      return response.data;
    } catch (error) {
      console.log("error is ", error);
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
)

const initialState = {
  myThreads: {
    allThreads: [],
  },
  currentThread: {}
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
    builder.addCase(getThreadById.fulfilled, (state, action) => {
      const {status, thread } = action.payload;
      if(status === 'success'){
        state.currentThread = thread;
      }
    })
  },
});

// export const {} = threadReducer.actions;
export default threadReducer.reducer;
