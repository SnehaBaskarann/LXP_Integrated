import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewRequest } from '../../../actions/Quiz And Feedback Module/ReviewAction';
import '../../../Styles/Quiz And Feedback Module/ReviewAnswers.css';

const ReviewAnswers = ({ attemptId }) => {
  const dispatch = useDispatch();
  const reviewData = useSelector((state) => state.Review.reviewData);
  const loading = useSelector((state) => state.Review.loading);
  const error = useSelector((state) => state.Review.error);

  useEffect(() => {
    dispatch(fetchReviewRequest(attemptId));
  }, [dispatch, attemptId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="review-container">
      {reviewData.map((question, index) => (
        <div key={question.quizQuestionId} className="question-container">
          <h5>{index + 1}: {question.question}</h5>
          <ul>
            {question.options.map((option, optionIndex) => (
              <li key={optionIndex}>
                <input
                  type={question.questionType === 'MSQ' ? 'checkbox' : 'radio'}
                  name={question.quizQuestionId}
                  value={option.option}
                  checked={question.selectedOptions.includes(option.option)}
                  readOnly
                />
                {option.option}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ReviewAnswers;