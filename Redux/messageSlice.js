import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "message",
  initialState: {},
  reducers: {
    addTaskRequest: (state) => {
      state.loading = true;
    },
    addTaskSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addTaskFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    getTaskRequest: (state) => {
      state.isLoading = true;
    },
    getTaskSuccess: (state, action) => {
      state.isLoading = false;
      state.allTasks = action.payload.allTasks;
    },
    getTaskFailure: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
  },
});

export const {
  addTaskRequest,
  addTaskSuccess,
  addTaskFail,
  clearErrors,
  clearMessage,
  getTaskRequest,
  getTaskSuccess,
  getTaskFailure,
} = messageSlice.actions;

export default messageSlice.reducer;
