import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewRequest } from '../../../actions/Quiz And Feedback Module/ReviewAction';
import { submitAttemptRequest } from '../../../actions/Quiz And Feedback Module/SubmitAttemptAction';
import '../../../Styles/Quiz And Feedback Module/ReviewAnswers.css';

const ReviewAnswers = ({ attemptId }) => {
  const dispatch = useDispatch();
  const reviewData = useSelector((state) => state.Review.reviewData);
  const loading = useSelector((state) => state.Review.loading);
  const error = useSelector((state) => state.Review.error);
  const submitLoading = useSelector((state) => state.SubmitAttempt.loading);
  const submitError = useSelector((state) => state.SubmitAttempt.error);
  const submitSuccess = useSelector((state) => state.SubmitAttempt.success);
  const AttemptId = reviewData.learnerAttemptId;
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (attemptId) {
      dispatch(fetchReviewRequest(attemptId));
      console.log(attemptId);
    }
  }, [dispatch, attemptId]);

  const handleSubmit = () => {
    dispatch(submitAttemptRequest(AttemptId));
    console.log("submit :",AttemptId);
    setShowPopup(false);
  };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!reviewData || !Array.isArray(reviewData.questionsAndAnswers) || reviewData.questionsAndAnswers.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <div className="review-container">
      {reviewData.questionsAndAnswers.map((question, index) => (
        <div key={question.quizQuestionId} className="question-container">
          <h5>{index + 1}: {question.question}</h5>
          <ul>
            {question.options.map((option, optionIndex) => (
              <li key={optionIndex}>
                <input
                  type={question.questionType === 'MSQ' ? 'checkbox' : 'radio'}
                  name={question.quizQuestionId}
                  value={option}
                  checked={Array.isArray(question.selectedOption) ? question.selectedOption.includes(option) : question.selectedOption === option}
                  readOnly
                />
                {option}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button className="submit-button" onClick={() => setShowPopup(true)}>Submit</button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Are you sure you want to submit?</p>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
      {submitLoading && <p>Submitting...</p>}
      {submitError && <p>Error: {submitError}</p>}
      {submitSuccess && <p>Submitted successfully!</p>}
    </div>
  );
};

export default ReviewAnswers;






















// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchReviewRequest } from '../../../actions/Quiz And Feedback Module/ReviewAction';
// import '../../../Styles/Quiz And Feedback Module/ReviewAnswers.css';

// const ReviewAnswers = ({ attemptId }) => {
//   const dispatch = useDispatch();
  
//   // Access the review data, loading state, and error from the Redux store
//   const reviewData = useSelector((state) => state.Review.reviewData);
//   const loading = useSelector((state) => state.Review.loading);
//   const error = useSelector((state) => state.Review.error);

//   // Fetch review data when the component mounts
//   useEffect(() => {
//     if (attemptId) {
//       dispatch(fetchReviewRequest(attemptId));
//     }
//   }, [dispatch, attemptId]);

//   // Handling loading and error states

// //   if (loading) {
// //     return <p>Loading...</p>;
// //   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   // Check if reviewData is an object and has questionsAndAnswers
//   if (!reviewData || !Array.isArray(reviewData.questionsAndAnswers) || reviewData.questionsAndAnswers.length === 0) {
//     return <p>No data available.</p>;
//   }

//   // Render the review data
//   return (
//     <div className="review-container">
//       {reviewData.questionsAndAnswers.map((question, index) => (
//         <div key={question.quizQuestionId} className="question-container">
//           <h5>{index + 1}: {question.question}</h5>
//           <ul>
//             {question.options.map((option, optionIndex) => (
//               <li key={optionIndex}>
//                 <input
//                   type={question.questionType === 'MSQ' ? 'checkbox' : 'radio'}
//                   name={question.quizQuestionId}
//                   value={option}
//                   checked={Array.isArray(question.selectedOption) ? question.selectedOption.includes(option) : question.selectedOption === option}
//                   readOnly
//                 />
//                 {option}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ReviewAnswers;


















// ----- Workable --------



// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchReviewRequest } from '../../../actions/Quiz And Feedback Module/ReviewAction';
// import '../../../Styles/Quiz And Feedback Module/ReviewAnswers.css';

// const ReviewAnswers = ({ attemptId }) => {
//   const dispatch = useDispatch();
  
//   // Access the review data, loading state, and error from the Redux store
//   const reviewData = useSelector((state) => state.Review.reviewData);
//   const loading = useSelector((state) => state.Review.loading);
//   const error = useSelector((state) => state.Review.error);

//   // Fetch review data when the component mounts
//   useEffect(() => {
//     if (attemptId) {
//       dispatch(fetchReviewRequest(attemptId));
//     }
//   }, [dispatch, attemptId]);

//   // Handling loading and error states

// //   if (loading) {
// //     return <p>Loading...</p>;
// //   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   // Check if reviewData is an object and has questionsAndAnswers
//   if (!reviewData || !Array.isArray(reviewData.questionsAndAnswers) || reviewData.questionsAndAnswers.length === 0) {
//     return <p>No data available.</p>;
//   }

//   // Render the review data
//   return (
//     <div className="review-container">
//       {reviewData.questionsAndAnswers.map((question, index) => (
//         <div key={question.quizQuestionId} className="question-container">
//           <h5>{index + 1}: {question.question}</h5>
//           <ul>
//             {question.options.map((option, optionIndex) => (
//               <li key={optionIndex}>
//                 <input
//                   type={Array.isArray(question.selectedOption) ? 'checkbox' : 'radio'}
//                   name={question.quizQuestionId}
//                   value={option}
//                   checked={Array.isArray(question.selectedOption) ? question.selectedOption.includes(option) : question.selectedOption === option}
//                   readOnly
//                 />
//                 {option}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ReviewAnswers;






















// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchReviewRequest } from '../../../actions/Quiz And Feedback Module/ReviewAction';
// import '../../../Styles/Quiz And Feedback Module/ReviewAnswers.css';

// const ReviewAnswers = ({ attemptId }) => {
//   const dispatch = useDispatch();
  
//   // Access the review data, loading state, and error from the Redux store
//   const reviewData = useSelector((state) => state.Review.reviewData);
//   const loading = useSelector((state) => state.Review.loading);
//   const error = useSelector((state) => state.Review.error);

//   // Add console logs to trace the data
//   console.log('Component Rendered');
//   console.log('Attempt ID:', reviewData.learnerAttemptId);
//   console.log('Questions:', reviewData.questionsAndAnswers);
//   console.log('Review Data:', reviewData);

//   useEffect(() => {
//     // Fetch review data when the component mounts
//     if (attemptId) {
//       dispatch(fetchReviewRequest(attemptId));
//     }
//   }, [dispatch, attemptId]);

//   // Handling loading and error states
//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   // Check if reviewData is an array and has elements
//   if (!Array.isArray(reviewData) || reviewData.length === 0) {
//     return <p>No data available.</p>;
//   }

//   // Render the review data
//   return (
//     <div className="review-container">
//       {reviewData.map((question, index) => (
//         <div key={question.quizQuestionId} className="question-container">
//           <h5>{index + 1}: {question.question}</h5>
//           <ul>
//             {question.options.map((option, optionIndex) => (
//               <li key={optionIndex}>
//                 <input
//                   type={question.questionType === 'MSQ' ? 'checkbox' : 'radio'}
//                   name={question.quizQuestionId}
//                   value={option.option}
//                   checked={question.selectedOptions.includes(option.option)}
//                   readOnly
//                 />
//                 {option.option}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ReviewAnswers;

















// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchReviewRequest } from '../../../actions/Quiz And Feedback Module/ReviewAction';
// import '../../../Styles/Quiz And Feedback Module/ReviewAnswers.css';

// const ReviewAnswers = ({ attemptId }) => {
//   const dispatch = useDispatch();
  
//   // Access the review data, loading state, and error from the Redux store
//   const reviewData = useSelector((state) => state.Review.reviewData);
//   const loading = useSelector((state) => state.Review.loading);
//   const error = useSelector((state) => state.Review.error);

//   // Add console logs to trace the data
//   console.log('Component Rendered');
//   console.log('Attempt ID:', attemptId);
//   console.log('Loading State:', loading);
//   console.log('Error State:', error);
//   console.log('Review Data:', reviewData);

//   useEffect(() => {
//     // Fetch review data when the component mounts
//     if (attemptId) {
//       dispatch(fetchReviewRequest(attemptId));
//     }
//   }, [dispatch, attemptId]);

//   // Handling loading and error states
//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   // Check if reviewData is an array and has elements
//   if (!Array.isArray(reviewData) || reviewData.length === 0) {
//     return <p>No data available.</p>;
//   }

//   // Render the review data
//   return (
//     <div className="review-container">
//       {reviewData.map((question, index) => (
//         <div key={question.quizQuestionId} className="question-container">
//           <h5>{index + 1}: {question.question}</h5>
//           <ul>
//             {question.options.map((option, optionIndex) => (
//               <li key={optionIndex}>
//                 <input
//                   type={question.questionType === 'MSQ' ? 'checkbox' : 'radio'}
//                   name={question.quizQuestionId}
//                   value={option.option}
//                   checked={question.selectedOptions.includes(option.option)}
//                   readOnly
//                 />
//                 {option.option}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ReviewAnswers;






















// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchReviewRequest } from '../../../actions/Quiz And Feedback Module/ReviewAction';
// import '../../../Styles/Quiz And Feedback Module/ReviewAnswers.css';

// const ReviewAnswers = ({ attemptId }) => {
//   const dispatch = useDispatch();
//   const reviewData = useSelector((state) => state.Review.reviewData);
//   const loading = useSelector((state) => state.Review.loading);
//   const error = useSelector((state) => state.Review.error);

//   useEffect(() => {
//     // Fetch review data when the component mounts
//     if (attemptId) {
//       dispatch(fetchReviewRequest(attemptId));
//     }
//   }, [dispatch, attemptId]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   if (!reviewData.length) {
//     return <p>No data available.</p>;
//   }

//   return (
//     <div className="review-container">
//       {reviewData.map((question, index) => (
//         <div key={question.quizQuestionId} className="question-container">
//           <h5>{index + 1}: {question.question}</h5>
//           <ul>
//             {question.options.map((option, optionIndex) => (
//               <li key={optionIndex}>
//                 <input
//                   type={question.questionType === 'MSQ' ? 'checkbox' : 'radio'}
//                   name={question.quizQuestionId}
//                   value={option.option}
//                   checked={question.selectedOptions.includes(option.option)}
//                   readOnly
//                 />
//                 {option.option}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ReviewAnswers;























// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchReviewRequest } from '../../../actions/Quiz And Feedback Module/ReviewAction';
// import '../../../Styles/Quiz And Feedback Module/ReviewAnswers.css';

// const ReviewAnswers = ({ attemptId }) => {
//   const dispatch = useDispatch();
//   const reviewData = useSelector((state) => state.Review.reviewData);
//   const loading = useSelector((state) => state.Review.loading);
//   const error = useSelector((state) => state.Review.error);

//   useEffect(() => {
//     dispatch(fetchReviewRequest(attemptId));
//   }, [dispatch, attemptId]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div className="review-container">
//       {reviewData.map((question, index) => (
//         <div key={question.quizQuestionId} className="question-container">
//           <h5>{index + 1}: {question.question}</h5>
//           <ul>
//             {question.options.map((option, optionIndex) => (
//               <li key={optionIndex}>
//                 <input
//                   type={question.questionType === 'MSQ' ? 'checkbox' : 'radio'}
//                   name={question.quizQuestionId}
//                   value={option.option}
//                   checked={question.selectedOptions.includes(option.option)}
//                   readOnly
//                 />
//                 {option.option}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ReviewAnswers;