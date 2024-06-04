import {
    SUBMIT_ATTEMPT_REQUEST,
    SUBMIT_ATTEMPT_SUCCESS,
    SUBMIT_ATTEMPT_FAILURE,
  } from '../../actions/Quiz And Feedback Module/SubmitAttemptAction';
  
  const initialState = {
    loading: false,
    success: null,
    error: null,
  };
  
  const submitAttemptReducer = (state = initialState, action) => {
    switch (action.type) {
      case SUBMIT_ATTEMPT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case SUBMIT_ATTEMPT_SUCCESS:
        return {
          ...state,
          loading: false,
          success: action.payload,
          error: null,
        };
      case SUBMIT_ATTEMPT_FAILURE:
        return {
          ...state,
          loading: false,
          success: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default submitAttemptReducer;