import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../store/reducers/userSlice";
import questionSlice from "../store/reducers/questionSlice";
import submissionSlice from "../store/reducers/submissionSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    question: questionSlice,
    submission: submissionSlice,
  },
});
