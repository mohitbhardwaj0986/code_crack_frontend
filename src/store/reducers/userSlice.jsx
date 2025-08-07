import { createSlice } from "@reduxjs/toolkit";
let storageUser = null;
try {
  const userData = localStorage.getItem("userInfo");
  if (userData && userData !== "undefined") {
    storageUser = JSON.parse(userData);
  }
} catch (error) {
  console.error("Invalid userInfo in localStorage", error);
  storageUser = null;
}

const storageToken =
  localStorage.getItem("accessToken") &&
  localStorage.getItem("accessToken") !== "undefined"
    ? localStorage.getItem("accessToken")
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
    userSuccess: (state, action) => {
      state.user = action.payload;
      state.accessToken = action.payload;
      state.loading = false;
    },
    userFail: (state, action) => {
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
