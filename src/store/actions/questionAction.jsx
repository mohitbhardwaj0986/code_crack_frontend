import { toast } from "sonner";
import axios from '../../axios/axios'
import {
  failQuestion,
  getAllQuestion,
  getSingleQuestion,
  questionRequest,

} from "../reducers/questionSlice";
export const asyncGetQuestionsByPage = () => async (dispatch) => {
  try {
    dispatch(questionRequest());

    const { data } = await axios.get(`/question/get-all`);
 
    dispatch(getAllQuestion(data.data));

  } catch (error) {
    dispatch(failQuestion("Failed to fetch questions"));
    return 1; // fallback
  }
};
export const asyncGetSingleQuestion = (id) => async (dispatch) => {
  try {
    dispatch(questionRequest());
    const { data } = await axios.get(`/question/get-single/${id}`);

    
    dispatch(getSingleQuestion(data?.data)); // assuming API structure
  } catch (err) {
    dispatch(failQuestion(err.response?.data?.message || "Something went wrong"));
  }
};

export const asyncCreateQuestion = (questionData) => async (dispatch) => {
  try {
console.log(questionData);

    const { data } = await axios.post("/question/create", questionData);
console.log(data);


  } catch (error) {
    dispatch(createQuestionFail("Failed to create question"));
  }
};