import {
    CREATE_ATTEMPT_REQUEST,
    CreateAttemptSuccess,
    CreateAttemptFailure,
  } from "../../actions/Quiz And Feedback Module/AttemptQuizAction";
  import axios from "axios";
  
//   const API_URL = "http://localhost:5199/api/QuizEngine/";
  
  export const LearnerAttemptQuizIdApi =
    ({ dispatch }) =>
    (next) =>
    async (action) => {
      if (action.type === CREATE_ATTEMPT_REQUEST) {
        try {
          console.log("LearnerAttemptId Post", action.payload);
          const response = await axios.post(`http://localhost:5199/api/QuizEngine/attempt?learnerId=${action.payload.learnerId}&quizId=${action.payload.quizId}`);
          console.log("LearnerAttemptId Post API Response:", response.data);
          dispatch(CreateAttemptSuccess(response.data.data));
        } catch (error) {
          console.error("API Error:", error.message);
          dispatch(CreateAttemptFailure(error.message));
          throw error; // Throw the error for better error handling
        }
      }
      return next(action);
    };
  
  export default LearnerAttemptQuizIdApi;
  