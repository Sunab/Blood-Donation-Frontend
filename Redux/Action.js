import { api } from "./api";
import {
  addTaskRequest,
  addTaskSuccess,
  addTaskFail,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskFail,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFail,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
  getTaskRequest,
  getTaskSuccess,
  getTaskFailure,
} from "./messageSlice";
import {
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  loginRequest,
  loginSuccess,
  loginFail,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  updatePassRequest,
  updatePassSuccess,
  updatePassFail,
  logoutRequest,
  logoutSuccess,
  logoutFail,
  registerRequest,
  registerSuccess,
  registerFail,
  verifyAccRequest,
  verifyAccSuccess,
  verifyAccFail,
} from "./userSlice";

// Login
export const login = (email, password) => async (dispatch) => {
  console.log(email, password);

  try {
    dispatch(loginRequest());
    const { data } = await api.post(`/login`, { email, password });
    console.log(data, "data yaha aayo");

    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFail(error.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());
    await api.get("/logout");
    dispatch(logoutSuccess());
    // await AsyncStorage.removeItem("token");
  } catch (error) {
    dispatch(logoutFail(error.message));
  }
};

// Get My Profile
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const { data } = await api.get("/profile");
    dispatch(loadUserSuccess(data));
  } catch (error) {
    dispatch(loadUserFail(error.response));
  }
};

// add Task

export const addTask =
  (title, description, hospital_name, blood_group, longitude, latitude) =>
  async (dispatch) => {
    try {
      dispatch(addTaskRequest());
      const { data } = await api.post("/newtask", {
        title,
        description,
        hospital_name,
        blood_group,
        longitude,
        latitude,
      });
      console.log(data, "responseeee");
      dispatch(addTaskSuccess(data.message));
    } catch (error) {
      dispatch(addTaskFail(error.response));
    }
  };
export const updateTask = (taskId) => async (dispatch) => {
  try {
    dispatch(updateTaskRequest());
    // const { data } = await axios.post(`${backendUrl}/new/task`, { title, description });
    const { data } = await api.get(`/task/${taskId}`);
    dispatch(updateTaskSuccess(data));
  } catch (error) {
    dispatch(updateTaskFail(error.message));
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  try {
    dispatch(deleteTaskRequest());
    // const { data } = await axios.post(`${backendUrl}/new/task`, { title, description });
    const { data } = await api.delete(`/task/${taskId}`);
    dispatch(deleteTaskSuccess(data));
  } catch (error) {
    dispatch(deleteTaskFail(error.message));
  }
};

// update profile
export const updateProfile = (formData) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());
    // const { data } = await axios.post(`${backendUrl}/new/task`, { title, description });
    const { data } = await api.put(`/updateProfile`, formData);
    dispatch(updateProfileSuccess(data));
  } catch (error) {
    dispatch(updateProfileFail(error.message));
  }
};
// Register user
export const register = (formData) => async (dispatch) => {
  console.log(formData, "dataaaaaa");
  try {
    dispatch(registerRequest());
    // const { data } = await axios.post(`${backendUrl}/new/task`, { title, description });
    const { data } = await api.post(`/register`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(registerSuccess(data));
  } catch (error) {
    console.log(error, "error from acionsss");
    dispatch(registerFail(error.message));
  }
};

// update profile
export const updatePassword =
  (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
      dispatch(updatePassRequest());
      // const { data } = await axios.post(`${backendUrl}/new/task`, { title, description });
      const { data } = await api.put(`/updatePassword`, {
        oldPassword,
        newPassword,
        confirmPassword,
      });
      dispatch(updatePassSuccess(data));
    } catch (error) {
      dispatch(updatePassFail(error.message));
    }
  };

// update profile
export const verifyAccount = (otp) => async (dispatch) => {
  try {
    dispatch(verifyAccRequest());
    // const { data } = await axios.post(`${backendUrl}/new/task`, { title, description });
    const { data } = await api.post(`/verify`, { otp });
    dispatch(verifyAccSuccess(data));
  } catch (error) {
    dispatch(verifyAccFail(error.message));
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());
    // const { data } = await axios.post(`${backendUrl}/new/task`, { title, description });
    const { data } = await api.post(`/forgetPassword`, {
      email,
    });
    dispatch(forgotPasswordSuccess(data));
  } catch (error) {
    dispatch(forgotPasswordFail(error.message));
  }
};
// update profile
export const resetPassword =
  (otp, newPassword, confirmPassword) => async (dispatch) => {
    try {
      dispatch(resetPasswordRequest());
      // const { data } = await axios.post(`${backendUrl}/new/task`, { title, description });
      const { data } = await api.put(`/resetPassword`, {
        otp,
        newPassword,
        confirmPassword,
      });
      dispatch(resetPasswordSuccess(data));
    } catch (error) {
      dispatch(resetPasswordFail(error.message));
    }
  };
//fetched all tasks array
export const getTasks = () => async (dispatch) => {
  try {
    dispatch(getTaskRequest());
    const { data } = await api.get("/viewtask");

    dispatch(getTaskSuccess(data));
  } catch (error) {
    dispatch(getTaskFailure(error.response));
  }
};
