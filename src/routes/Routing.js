import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import CreateQuizView from "../View/Quiz And Feedback Module/CreateQuizView";
import UploadBulkQuiz from "../components/Quiz And Feedback Module/QuizComponents/UploadBulkQuiz";
import ReviewQuestions from "../components/Quiz And Feedback Module/QuizComponents/ReviewQuestions";
import GetAllFeedbacks from "../components/Quiz And Feedback Module/QuizComponents/GetAllFeedbacks";
import GetTopicFeedback from "../components/Quiz And Feedback Module/QuizComponents/GetTopicFeedback";
import CoursePageView from "../View/Quiz And Feedback Module/CoursePageView";
// import { QuestionTemplate } from "../components/Quiz And Feedback Module/QuizComponents/QuestionTemplate";
import QuestionTemplateView from "../View/Quiz And Feedback Module/QuestionTemplateView";
import LearnerCoursepageView from "../View/Quiz And Feedback Module/LearnerCoursepageview";
import QuizInstruction from "../components/Quiz And Feedback Module/QuizComponents/Learner/QuizInstruction";
import AttemptQuiz from "../components/Quiz And Feedback Module/QuizComponents/Learner/AttemptQuiz";
import ReviewAnswers from "../components/Quiz And Feedback Module/QuizComponents/Learner/ReviewAnswers";
import LearnerCoursepage from "../components/Quiz And Feedback Module/QuizComponents/Learner/LearnerCoursepage";
import { LearnerScorePage } from "../components/Quiz And Feedback Module/QuizComponents/Learner/LearnerScorePage";
import TopicFeedbackquestion from "../components/Quiz And Feedback Module/QuizComponents/Learner/FetchTopicFeedbackQuestion";
import FetchQuizFeedbackQuestion from "../components/Quiz And Feedback Module/QuizComponents/Learner/FetchQuizFeedbackQuestion";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CoursePageView />} />
        <Route path="/createquiz" element={<CreateQuizView />} />
        <Route path="/questiontemplate" element={<QuestionTemplateView />} />
        <Route path="/getallfeedback" element={<GetAllFeedbacks />} />
        <Route path="/reviewquestions" element={<ReviewQuestions />} />
        <Route path="/topicfeedback" element={<GetTopicFeedback />} />
        <Route path="/quizfeedback" element={<GetAllFeedbacks />} />
        <Route path="/upload" element={<UploadBulkQuiz />} />



     {/* Learner side */}
        <Route path="/quizengine" element={<LearnerCoursepageView />} />
        <Route path="/instruction" element={<QuizInstruction/>} />
        <Route path="/attemptquiz" element={<AttemptQuiz />} />
        <Route path="/reviewanswer" element={<ReviewAnswers />} />
        <Route path="/learnerscorepage" element={<LearnerScorePage />} />
        <Route path="/topicfeedbackquestion" element={<TopicFeedbackquestion/>} />
        <Route path="/quizfeedbackquestion" element={<FetchQuizFeedbackQuestion/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default Routing;
