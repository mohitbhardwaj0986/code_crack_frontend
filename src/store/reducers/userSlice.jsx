import { createSlice } from "@reduxjs/toolkit";
const storageUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("use"))
  : null;
const storageToken = localStorage.getItem("accessToken")
  ? JSON.parse(localStorage.getItem("accessToken"))
  : null;
const initialState = {
  user: storageUser,
  accessToken: storageToken,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    userSuccess: (state) => {
      state.user = action.payload;
      state.loading = false;
    },
    userFail: (state) => {
      state.error = action.payload;
      state.loading = false;
    },
    logOutUser: (state) => {
      state.user = null;
      state.accessToken = null;
      state.loading = false;
    },
  },
});

export const { userFail, logOutUser, userRequest, userSuccess } =
  userSlice.actions;
export default userSlice.reducer;
