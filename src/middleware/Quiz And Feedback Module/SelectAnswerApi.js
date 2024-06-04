import axios from 'axios';
import {
  SELECT_ANSWER_REQUEST,
  selectAnswerSuccess,
  selectAnswerFailure,
} from '../../actions/Quiz And Feedback Module/SelectAnswerAction';

export const selectAnswerMiddleware = ({ dispatch }) => (next) => async (action) => {
  if (action.type === SELECT_ANSWER_REQUEST) {
    try {
      const response = await axios.post('http://localhost:5199/api/QuizEngine/answer', action.payload);
      dispatch(selectAnswerSuccess(response.data));
      console.log('Answer submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting answer:', error.message);
      dispatch(selectAnswerFailure(error.message));
    }
  }
  return next(action);
};