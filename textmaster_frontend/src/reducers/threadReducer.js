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
  async (search, filter = "") => {
    try {
      const response = await newRequest.get(`/thread?search=${search}&filter=${filter}`);

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
  async ({ slug }) => {
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
);

export const updateThreadVisibility = createAsyncThunk(
  "thread/updateThreadVisibility",
  async ({ slug, visibility }) => {
    try {
      console.log("slug is ", slug);
      console.log("visibility is ", visibility);
      const response = await newRequest.patch(`/thread/slug/${slug}`, {
        visibility,
      });
      console.log("response ", response.data);
      return response.data;
    } catch (error) {
      const { status, message } = error.response.data;
      if (status === "success") {
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

export const toggleThreadBookmarkStatus = createAsyncThunk(
  "thread/toggleThreadBookmarkStatus",
  async ({ slug }) => {
    try {
      const response = await newRequest.patch(
        `/thread/toggle_bookmark/slug/${slug}`,
        {}
      );
      console.log("response ", response.data);
      // const { status, message, thread } = response.data;
      // if (status === "success") {
      //   toast.success(message, {
      //     ...toastData,
      //   });
      // }
      return response.data;
    } catch (error) {
      const { status, message } = error.response.data;
      if (status === "success") {
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
    search: ""
  },
  currentThread: {},
};

const threadReducer = createSlice({
  name: "thread",
  initialState,
  reducers: {
    clearCurrentThread: (state) => {
      state.currentThread = {};
    },
    setCurrentThread: (state, action) => {
      state.currentThread = action.payload;
    },
    setFilters: (state, action) => {
      const {entity, value} = action.payload;
      state[entity].search = value;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMyThreads.fulfilled, (state, action) => {
      const { status, allThreads } = action.payload;
      if (status === "success") {
        state.myThreads.allThreads = allThreads;
      }
    });
    builder.addCase(getThreadById.fulfilled, (state, action) => {
      const { status, thread } = action.payload;
      if (status === "success") {
        state.currentThread = thread;
      }
    });
    builder.addCase(updateThreadVisibility.fulfilled, (state, action) => {
      const { status, updatedThread } = action.payload;
      if (status === "success") {
        state.currentThread = updatedThread;
      }
    });
    builder.addCase(toggleThreadBookmarkStatus.fulfilled, (state, action) => {
      const { status, thread } = action.payload;
      if (status === "success") {
        const findIndex = state.myThreads.allThreads.findIndex(
          (oneThread) => oneThread._id === thread._id
        );
        if (findIndex !== -1) {
          state.myThreads.allThreads[findIndex].bookmarked = thread.bookmarked;
        }
      }
    });
  },
});

export const { clearCurrentThread, setCurrentThread, setFilters } = threadReducer.actions;
export default threadReducer.reducer;
