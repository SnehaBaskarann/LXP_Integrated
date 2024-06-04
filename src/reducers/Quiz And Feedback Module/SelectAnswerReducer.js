import {
    SELECT_ANSWER_REQUEST,
    SELECT_ANSWER_SUCCESS,
    SELECT_ANSWER_FAILURE,
  } from '../../actions/Quiz And Feedback Module/SelectAnswerAction';
  
  const initialState = {
    questions: [],
    loading: false,
    error: null,
  };
  
  const SelectAnswerReducer = (state = initialState, action) => {
    switch (action.type) {
      case SELECT_ANSWER_REQUEST:
        return { ...state, loading: true , error: null };
      case SELECT_ANSWER_SUCCESS:
        return { ...state, loading: false };
      case SELECT_ANSWER_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default SelectAnswerReducer;