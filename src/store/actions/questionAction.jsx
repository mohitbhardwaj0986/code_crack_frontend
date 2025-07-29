import { toast } from "sonner";
import axios from '../../axios/axios'
import {
  failQuestion,
  getAllQuestion,
  getSingleQuestion,
  questionRequest,

} from "../reducers/questionSlice";
export const asyncGetQuestionsByPage = (page = 1, limit = 10) => async (dispatch) => {
  try {
    dispatch(questionRequest());

    const { data } = await axios.get(`/question/get-all?page=${page}&limit=${limit}`);
    dispatch(getAllQuestion(data.data.questions));

    return data.data.totalPages; // 👈 return total pages
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

