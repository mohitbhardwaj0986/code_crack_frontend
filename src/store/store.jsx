import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../store/reducers/userSlice'
export const store = configureStore({
  reducer: {
    user:userSlice,
  },
});
