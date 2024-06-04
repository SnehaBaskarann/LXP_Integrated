import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestionsRequest } from '../../../actions/Quiz And Feedback Module/AttemptQuizAction';
import { fetchReviewRequest } from '../../../actions/Quiz And Feedback Module/ReviewAction';
import { selectAnswerRequest } from '../../../actions/Quiz And Feedback Module/SelectAnswerAction';
import { useNavigate } from 'react-router-dom';
import '../../../Styles/Quiz And Feedback Module/AttemptQuiz.css';

const AttemptQuiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quizId = "1cf196c9-e9f7-4224-83be-e2d3dca69976";
  const questions = useSelector((state) => state.AttemptQuiz.questions);
  const selectAnswerError = useSelector((state) => state.AttemptQuiz.error); // Error state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    fetchQuestions(quizId);
  }, [quizId]);

  const fetchQuestions = async (quizId) => {
    try {
      dispatch(fetchQuestionsRequest(quizId));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleOptionChange = (questionId, optionValue, isMSQ) => {
    const learnerAttemptId = "08dc83ed-4810-4e72-83df-7e2bb3075569";

    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = { ...prevSelectedOptions };

      if (isMSQ) {
        const selectedForQuestion = updatedOptions[questionId] || [];
        if (selectedForQuestion.includes(optionValue)) {
          updatedOptions[questionId] = selectedForQuestion.filter((opt) => opt !== optionValue);
        } else {
          updatedOptions[questionId] = [...selectedForQuestion, optionValue];
        }
      } else {
        updatedOptions[questionId] = [optionValue];
      }

      // Dispatch action to save the answer
      dispatch(selectAnswerRequest({
        learnerAttemptId,
        quizQuestionId: questionId,
        selectedOptions: updatedOptions[questionId],
      }));

      return updatedOptions;
    });
  };

  const handleSubmit = () => {
    const attemptId = "08dc83ed-4810-4e72-83df-7e2bb3075569";
    dispatch(fetchReviewRequest(attemptId));
    navigate('/reviewanswer'); // Navigate to the review page
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="attempt-quiz-page">
      <h1 className="quiz-title">Attempt Quiz</h1>
      <div className="quiz-content">
        <div className="navbar">
          {questions && questions.length > 0 ? (
            questions.map((_, index) => (
              <button key={index} onClick={() => handleQuestionClick(index)}>
                {index + 1}
              </button>
            ))
          ) : (
            <p>No questions available</p>
          )}
        </div>
        <div className="main-content1">
          {questions && questions.length > 0 ? (
            <>
              <div className="question-container">
                <h5>{questions[currentQuestionIndex].questionNo}. {questions[currentQuestionIndex].question}</h5>
                <ul>
                  {questions[currentQuestionIndex].options.map((option, optionIndex) => (
                    <li key={optionIndex}>
                      <input
                        type={
                          questions[currentQuestionIndex].questionType === 'MCQ' ||
                          questions[currentQuestionIndex].questionType === 'TF' ||
                          questions[currentQuestionIndex].questionType === 'T/F'
                            ? 'radio'
                            : 'checkbox'
                        }
                        name={questions[currentQuestionIndex].quizQuestionId}
                        value={option.option}
                        checked={
                          selectedOptions[questions[currentQuestionIndex].quizQuestionId]?.includes(option.option) || false
                        }
                        onChange={() => handleOptionChange(
                          questions[currentQuestionIndex].quizQuestionId,
                          option.option,
                          questions[currentQuestionIndex].questionType === 'MSQ'
                        )}
                      />
                      {option.option}
                    </li>
                  ))}
                </ul>
              </div>
              {selectAnswerError && <p className="error-message">Error: {selectAnswerError}</p>} {/* Display error */}
              <div className="navigation-buttons">
                <button
                  className="previous-button"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </button>
                {currentQuestionIndex < questions.length - 1 ? (
                  <button className="next-button" onClick={handleNext}>
                    Next
                  </button>
                ) : (
                  <button className="submit-button" onClick={handleSubmit}>
                    Review
                  </button>
                )}
              </div>
            </>
          ) : (
            <p>Loading questions...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttemptQuiz;


















// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchQuestionsRequest } from "../../../actions/Quiz And Feedback Module/AttemptQuizAction";
// import "../../../Styles/Quiz And Feedback Module/AttemptQuiz.css";

// export const AttemptQuiz = () => {
//   const dispatch = useDispatch();
//   const quizId = "43588fc6-1eb2-4459-8313-527b4276c596";
//   const questions = useSelector((state) => state.AttemptQuiz.questions);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  

//   useEffect(() => {
//     fetchQuestions(quizId);
//   }, [quizId]);

//   const fetchQuestions = async (quizId) => {
//     try {
//       dispatch(fetchQuestionsRequest(quizId));
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleQuestionClick = (index) => {
//     setCurrentQuestionIndex(index);
//   };

//   const handleSubmit = () => {
//     // Handle form submission logic here
//     console.log("Quiz submitted");
//   };

//   return (
//     <div className="attempt-quiz-page">
//       <h1 className="quiz-title">Attempt Quiz</h1>
//       <div className="quiz-content">
//         <div className="navbar">
//           {questions && questions.length > 0 ? (
//             questions.map((_, index) => (
//               <button key={index} onClick={() => handleQuestionClick(index)}>
//                 {index + 1}
//               </button>
//             ))
//           ) : (
//             <p>No questions available</p>
//           )}
//         </div>
//         <div className="main-content1">
//           {questions && questions.length > 0 ? (
//             <>
//               <div className="question-container">
//                 <h5>
//                   {questions[currentQuestionIndex].questionNo}.{" "}
//                   {questions[currentQuestionIndex].question}
//                 </h5>
//                 <ul>
//                   {questions[currentQuestionIndex].options.map(
//                     (option, optionIndex) => (
//                       <li key={optionIndex}>
//                         <input
//                           type={
//                             questions[currentQuestionIndex].questionType ===
//                               "MCQ" ||
//                             questions[currentQuestionIndex].questionType ===
//                               "TF" ||
//                             questions[currentQuestionIndex].questionType ===
//                               "T/F"
//                               ? "radio"
//                               : "checkbox"
//                           }
//                           name={questions[currentQuestionIndex].quizQuestionId}
//                           value={option.option}
//                         />
//                         {option.option}
//                       </li>
//                     )
//                   )}
//                 </ul>
//               </div>
//               {currentQuestionIndex === questions.length - 1 && (
//                 <button className="submit-button" onClick={handleSubmit}>
//                   Submit
//                 </button>
//               )}
//             </>
//           ) : (
//             <p>No questions available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttemptQuiz;
