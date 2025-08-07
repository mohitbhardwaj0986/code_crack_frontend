import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getSubmissionsByQuestion: [],
  getSubmissionsByUser: [],
  getUserSubmissionsForQuestion: [],
  aiSubmission: null,
  submissionLoading: false,
  aisubmissionLoading: false,
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
    aisubmissionRequest: (state) => {
      state.aisubmissionLoading = true;
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
    
      
      state.aiSubmission = action.payload;
      state.aisubmissionLoading = false;
    },

    clearAiSubmission: (state) => {
      state.aiSubmission = null;
      state.aisubmissionLoading = false;
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
  aisubmissionRequest,
} = submissionSlice.actions;

export default submissionSlice.reducer;
