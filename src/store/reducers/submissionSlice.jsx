import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getSubmissionsByQuestion: [],
  getSubmissionsByUser: [],
  getUserSubmissionsForQuestion: [],
  aiSubmission: null,
  submissionLoading: false,
  submissionError: null,
};

const submissionSlice = createSlice({
  name: "submission",
  initialState,
  reducers: {
    submissionRequest: (state) => {
      state.submissionLoading = true;
      state.submissionError = null;
    },

    getSubmissionsByQuestionSuccess: (state, action) => {
      state.getSubmissionsByQuestion = action.payload;
      state.submissionLoading = false;
    },

    getSubmissionsByUserSuccess: (state, action) => {
      state.getSubmissionsByUser = action.payload;
      state.submissionLoading = false;
    },

    getUserSubmissionsForQuestionSuccess: (state, action) => {
      state.getUserSubmissionsForQuestion = action.payload;
      state.submissionLoading = false;
    },

    submissionFailed: (state, action) => {
      state.submissionError = action.payload;
      state.submissionLoading = false;
    },

    clearSubmissions: (state) => {
      state.getSubmissionsByQuestion = [];
      state.getSubmissionsByUser = [];
      state.getUserSubmissionsForQuestion = [];
      state.submissionError = null;
    },

    getAiSubmission: (state, action) => {
      console.log(state.submissionLoading)
      
      state.aiSubmission = action.payload;
      state.submissionLoading = false;
    },

    clearAiSubmission: (state) => {
      state.aiSubmission = null;
      state.submissionLoading = false;
    },
  },
});

export const {
  submissionRequest,
  getSubmissionsByQuestionSuccess,
  getSubmissionsByUserSuccess,
  getUserSubmissionsForQuestionSuccess,
  submissionFailed,
  clearSubmissions,
  getAiSubmission,
  clearAiSubmission,
} = submissionSlice.actions;

export default submissionSlice.reducer;
