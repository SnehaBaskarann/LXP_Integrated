import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // Corrected import
import quizIdReducer from "../reducers/Quiz And Feedback Module/FetchQuizIdReducer";
import { QuizFeedbackApi } from "../middleware/Quiz And Feedback Module/QuizFeedbackApi";
import QuizFeedbackReducer from "../reducers/Quiz And Feedback Module/QuizFeedbackReducer";
import TopicFeedbackReducer from "../reducers/Quiz And Feedback Module/TopicFeedbackReducer";
import { TopicFeedbackApi } from "../middleware/Quiz And Feedback Module/TopicFeedbackApi";
import GetAllFeedbackReducer from "../reducers/Quiz And Feedback Module/GetAllFeedbackReducer";
import { GetAllFeedbackApi } from "../middleware/Quiz And Feedback Module/GetAllFeedbackApi";
import GetTopicFeedbackReducer from "../reducers/Quiz And Feedback Module/GetTopicFeedbackReducer";
import { GetTopicFeedbackApi } from "../middleware/Quiz And Feedback Module/GetTopicFeedbackApi";
import {
  DeleteQuizQuestionsApi,
  GetAllQuestion,
  UpdateQuizQuestionsApi,
} from "../middleware/Quiz And Feedback Module/QuestionApi";
import questionReducer from "../reducers/Quiz And Feedback Module/FetchQuizQuestionsReducer.js";
import { CreateQuizApi } from "../middleware/Quiz And Feedback Module/CreateQuizApi";
import { FetchQuizById } from "../middleware/Quiz And Feedback Module/FetchQuizIdApi";
import fetchQuizQuestionsReducer from "../reducers/Quiz And Feedback Module/FetchQuizQuestionsReducer.js";
import { FetchQuizQuestionsApi } from "../middleware/Quiz And Feedback Module/FetchQuizQuestionsApi";
import deleteQuizQuestionsReducer from "../reducers/Quiz And Feedback Module/DeleteQuizQuestionReducer";
import updateQuizQuestionReducer from "../reducers/Quiz And Feedback Module/UpdateQuizQuestionReducer";
import createQuizReducer from "../reducers/Quiz And Feedback Module/CreateQuizReducer";
import DeleteQuizFeedbackApi from "../middleware/Quiz And Feedback Module/DeleteQuizFeedbackApi";
import UpdateQuizFeedbackApi from "../middleware/Quiz And Feedback Module/UpdateQuizFeedbackApi";
import GetByIDFeedbackApi from "../middleware/Quiz And Feedback Module/GetByIDFeedbackApi";
import DeleteTopicFeedbackApi from "../middleware/Quiz And Feedback Module/DeleteTopicFeedbackApi";
import UpdateTopicFeedbackApi from "../middleware/Quiz And Feedback Module/UpdateTopicFeedbackApi";
import GetByIDTopicFeedbackApi from "../middleware/Quiz And Feedback Module/GetByIDTopicFeedbackApi";
import UpdateQuizFeedbackReducer from "../reducers/Quiz And Feedback Module/UpdateQuizFeedbackReducer";
import GetByIDQuizFeedbackReducer from "../reducers/Quiz And Feedback Module/GetByIDQuizFeedbackReducer";
import DeleteQuizFeedbackReducer from "../reducers/Quiz And Feedback Module/DeleteQuizFeedbackReducer";
import DeleteTopicFeedbackReducer from "../reducers/Quiz And Feedback Module/DeleteTopicFeedbackReducer";
import UpdateTopicFeedbackReducer from "../reducers/Quiz And Feedback Module/UpdateTopicFeedbackReducer";
import GetByIDTopicFeedbackReducer from "../reducers/Quiz And Feedback Module/GetByIDTopicFeedbackReducer";
import AttemptQuizReducer from "../reducers/Quiz And Feedback Module/AttemptQuizReducer";
import QuizInstructionReducer from "../reducers/Quiz And Feedback Module/QuizInstructionReducer";
import { QuizInstructionApi } from "../middleware/Quiz And Feedback Module/QuizInstructionApi";
import LearnerAttemptQuizIdReducer from "../reducers/Quiz And Feedback Module/LearnerAttemptQuizIdReducer.js";
import LearnerAttemptQuizIdApi from "../middleware/Quiz And Feedback Module/LearnerAttemptQuizIdApi.js";
import GetLearnerIDReducer from "../reducers/Quiz And Feedback Module/GetLearnerIDReducer.js";
import GetLearnerIDApi from "../middleware/Quiz And Feedback Module/GetLearnerIDApi.js";
import reviewReducer from "../reducers/Quiz And Feedback Module/ReviewReducer";
import reviewApi from "../middleware/Quiz And Feedback Module/ReviewApi";
import { fetchQuestionsMiddleware } from "../middleware/Quiz And Feedback Module/AttemptQuizApi";
import SelectAnswerReducer from "../reducers/Quiz And Feedback Module/SelectAnswerReducer";
import submitAttemptReducer from "../reducers/Quiz And Feedback Module/SubmitAttemptReducer";
import { selectAnswerMiddleware } from "../middleware/Quiz And Feedback Module/SelectAnswerApi";
import submitAttemptMiddleware from "../middleware/Quiz And Feedback Module/SubmitAttemptMiddleware";
import LearnerScorePageReducer from "../reducers/Quiz And Feedback Module/LearnerScorePageReducer";
import LearnerScorePageApi from "../middleware/Quiz And Feedback Module/LearnerScorePageApi";

export const rootReducer = combineReducers({
  quizId: quizIdReducer,
  quizQuestions: fetchQuizQuestionsReducer,
  deleteQuestion: deleteQuizQuestionsReducer,
  editQuizQuestion: updateQuizQuestionReducer,
  quiz: createQuizReducer,
  quizfeedback: QuizFeedbackReducer,
  TopicFeedback: TopicFeedbackReducer,
  fetchfeedback: GetAllFeedbackReducer,
  fetchtopicfeedback: GetTopicFeedbackReducer,
  updatequizfeedback: UpdateQuizFeedbackReducer,
  fetchquizfeedbackid: GetByIDQuizFeedbackReducer,
  deletequizfeedback: DeleteQuizFeedbackReducer,
  deletetopicfeedback: DeleteTopicFeedbackReducer,
  updatetopicfeedback: UpdateTopicFeedbackReducer,
  fetchtopicfeedbackid: GetByIDTopicFeedbackReducer,
  AttemptQuiz: AttemptQuizReducer,
  fetchquizinstruction:QuizInstructionReducer,
  learnerattempt:LearnerAttemptQuizIdReducer,
  fetchlearnerid :GetLearnerIDReducer,
  Review: reviewReducer,
  SelectAnswer: SelectAnswerReducer,
  SubmitAttempt: submitAttemptReducer,
  learnerscore : LearnerScorePageReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    FetchQuizById,
    FetchQuizQuestionsApi,
    DeleteQuizQuestionsApi,
    UpdateQuizQuestionsApi,
    CreateQuizApi,
    QuizFeedbackApi,
    TopicFeedbackApi,
    GetAllFeedbackApi,
    GetTopicFeedbackApi,
   UpdateQuizFeedbackApi,
  GetByIDFeedbackApi,
   DeleteTopicFeedbackApi,
  DeleteQuizFeedbackApi,
  UpdateTopicFeedbackApi,
    GetByIDTopicFeedbackApi,
    fetchQuestionsMiddleware,
    QuizInstructionApi,
    LearnerAttemptQuizIdApi,
    GetLearnerIDApi,
    reviewApi,
    selectAnswerMiddleware,
    submitAttemptMiddleware,
    LearnerScorePageApi,
  )
);

export default store;
