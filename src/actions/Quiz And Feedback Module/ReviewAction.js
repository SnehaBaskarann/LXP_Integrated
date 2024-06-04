export const FETCH_REVIEW_REQUEST = 'FETCH_REVIEW_REQUEST';
export const FETCH_REVIEW_SUCCESS = 'FETCH_REVIEW_SUCCESS';
export const FETCH_REVIEW_FAILURE = 'FETCH_REVIEW_FAILURE';


export const fetchReviewRequest = (attemptId) => {
  console.log('Fetching review request...');
  return {
    type: FETCH_REVIEW_REQUEST,
    attemptId
  };
};

export const fetchReviewSuccess = (reviewData) => {
  console.log('Review data fetched successfully:', reviewData);
  return {
    type: FETCH_REVIEW_SUCCESS,
    reviewData
  };
};

export const fetchReviewFailure = (error) => {
  console.error('Error fetching review data:', error);
  return {
    type: FETCH_REVIEW_FAILURE,
    error
  };
};