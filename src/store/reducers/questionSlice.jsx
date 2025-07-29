import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],            
  singleQuestion: null,
 
  questionLoading: false,
  questionError: null,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    questionRequest: (state) => {
      state.questionLoading = true;

      state.questionError = null;
    },

    getAllQuestion: (state, action) => {
      // ✅ Append new page data for infinite scroll
      state.questions = [...state.questions, ...action.payload];
      state.questionLoading = false;
    },

    getSingleQuestion: (state, action) => {
     
      
      state.singleQuestion = action.payload;
      state.questionLoading = false;
    },

    failQuestion: (state, action) => {
      state.questionError = action.payload;
      state.questionLoading = false;
    },

    clearQuestions: (state) => {
      state.questions = []; 
    }
  },
});

export const {
  questionRequest,
  getAllQuestion,
  getSingleQuestion,
  failQuestion,
  clearQuestions,
} = questionSlice.actions;

export default questionSlice.reducer;
