import {
    CREATE_ATTEMPT_REQUEST,
    CREATE_ATTEMPT_SUCCESS,
    CREATE_ATTEMPT_FAILURE
  } from '../../../src/actions/Quiz And Feedback Module/AttemptQuizAction';
 
const initialState = {
  loading: false,
  error: null,
};
 
const LearnerAttemptQuizIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ATTEMPT_REQUEST:
      return { ...state, loading: true };
    case CREATE_ATTEMPT_SUCCESS:
      console.log("LearnerAttemptQuizId Reducer", action.payload);
      return { ...state, loading: false, questions: action.payload };
    case CREATE_ATTEMPT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
 

export default LearnerAttemptQuizIdReducer

