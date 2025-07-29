import axios from "../../axios/axios";
import {
  getSubmissionsByQuestionSuccess,
  getAiSubmission,
  getSubmissionsByUserSuccess,
  getUserSubmissionsForQuestionSuccess,
  submissionFailed,
  submissionRequest,
} from "../reducers/submissionSlice";

// 1. GET submissions by user
export const asyncGetSubmissionsByUser = (userId) => async (dispatch) => {
  try {
    dispatch(submissionRequest());
    const { data } = await axios.get(
      `/submission/getsubmission-user/${userId}`
    );
    dispatch(getSubmissionsByUserSuccess(data?.data));
  } catch (error) {
    dispatch(submissionFailed(error.response?.data?.message || error.message));
  }
};

// 2. GET submissions by question
export const asyncGetSubmissionsByQuestion =
  (questionId) => async (dispatch) => {
    try {
      dispatch(submissionRequest());
      const { data } = await axios.get(
        `/submission/getsubmission-question/${questionId}`
      );
      dispatch(getSubmissionsByQuestionSuccess(data?.data));
    } catch (error) {
      dispatch(
        submissionFailed(error.response?.data?.message || error.message)
      );
    }
  };

// 3. GET user submissions for a specific question
export const asyncGetUserSubmissionsForQuestion =
  (userId, questionId) => async (dispatch) => {
    try {
      dispatch(submissionRequest());
      const { data } = await axios.get(
        `/submission/get-user-submission-question/${userId}/${questionId}`
      );

      dispatch(getUserSubmissionsForQuestionSuccess(data?.data));
    } catch (error) {
      dispatch(
        submissionFailed(error.response?.data?.message || error.message)
      );
    }
  };

export const asyncAiSubmission = (formData) => async (dispatch) => {
  try {
    dispatch(submissionRequest()); 
   

    const { data } = await axios.post("/gemini/chat", {
      message: formData,
    });

    dispatch(getAiSubmission(data));
  } catch (error) {
    dispatch(
      submissionFailed(error.response?.data?.message || "Something went wrong")
    );
    console.log(error.response?.data?.message || error.message);
  }
};
