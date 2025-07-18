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
    console.log("run");

    await axios.post("/user/logout");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    navigate("/login")
    toast.success("User logged out!");
    dispatch(logOutUser());
  } catch (error) {
    dispatch(userFail("failed in logged out!"));
    toast.error("failed in logged out!");
  }
};
