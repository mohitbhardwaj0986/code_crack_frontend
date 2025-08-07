import {
  logOutUser,
  userFail,
  userRequest,
  userSuccess,
} from "../reducers/userSlice";
import axios from "../../axios/axios";
import { toast } from "sonner";
export const asyncLogin = (formData, navigate) => async (dispatch) => {
  try {
    dispatch(userRequest());
    const { data } = await axios.post("/user/login", formData);
    console.log(data?.data?.user);
    dispatch(userSuccess(data?.data?.user));
    localStorage.setItem("accessToken", data?.data?.accessToken);
    localStorage.setItem("userInfo", JSON.stringify(data?.data?.user));
    toast.success("Logged in successfully!");
    navigate("/");
  } catch (error) {
    dispatch(userFail("Login failed"));
    toast.error("Invalid Credencials");
  }
};

export const asyncRegister = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await axios.post("/user/register", formData);

    toast.success("User Created Please Login!");
    navigate("/login");
  } catch (error) {
    dispatch(userFail("register failed"));
    toast.error("Failed to register Try Agian!");
  }
};

export const asyncLogout = (navigate) => async (dispatch) => {
  try {
    dispatch(userRequest());

    await axios.post("/user/logout");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    navigate("/login");
    toast.success("User logged out!");
    dispatch(logOutUser());
  } catch (error) {
    dispatch(userFail("failed in logged out!"));
    toast.error("failed in logged out!");
  }
};

export const asyncChangePassword = (formData, navigate) => async (dispatch) => {
  try {
    dispatch(userRequest());
    const { data } = await axios.patch("/user/change-password", formData);
    dispatch(asyncGetCurrentUser());
    console.log(data);

    toast.success("Password changed successfully");
    navigate("/");
    dispatch(userSuccess(data?.data));
  } catch (error) {
    dispatch(userFail(error.response?.data?.data?.message));
    toast.error(
      error.response?.data?.data?.message ||
        "Failed to change password Try again"
    );
  }
};

export const asyncGetCurrentUser = () => async (dispatch) => {
  try {
    dispatch(userRequest());
    const { data } = await axios.get("/user/get-user");
 localStorage.setItem("userInfo", JSON.stringify(data?.data));
    dispatch(userSuccess(data?.data));
  } catch (error) {
    const msg = error.response?.data?.message || "Failed to fetch user";
    dispatch(userFail(msg));
  }
};

export const asyncUpdateUseDetials = (formData) => async (dispatch) => {
  try {
    console.log(formData);

    const { data } = await axios.patch("/user/update-details", formData);
    dispatch(asyncGetCurrentUser());

    toast.success("Account details updated");
  } catch (error) {
    dispatch(userFail(error.response?.data?.data?.message));
    toast.error("failed in updation");
  }
};

export const asyncChangeAvartar = (formData) => async (dispatch) => {
  try {
    dispatch(userRequest());

    const { data } = await axios.patch("/user/update-avatar", formData);
    dispatch(asyncGetCurrentUser());
    toast.success("Avatar changed successfully");
    dispatch(userSuccess(data?.data));
    console.log(data);
  } catch (error) {
    const msg = error.response?.data?.message || "Failed to change avatar";
    dispatch(userFail(msg));
    toast.error(msg);
  }
};
