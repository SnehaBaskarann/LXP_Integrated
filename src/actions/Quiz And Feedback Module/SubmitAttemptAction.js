// src/actions/SubmitAttemptAction.js
export const SUBMIT_ATTEMPT_REQUEST = 'SUBMIT_ATTEMPT_REQUEST';
export const SUBMIT_ATTEMPT_SUCCESS = 'SUBMIT_ATTEMPT_SUCCESS';
export const SUBMIT_ATTEMPT_FAILURE = 'SUBMIT_ATTEMPT_FAILURE';

export const submitAttemptRequest = (attemptId) => ({
  type: SUBMIT_ATTEMPT_REQUEST,
  payload: attemptId,
});

export const submitAttemptSuccess = (response) => ({
  type: SUBMIT_ATTEMPT_SUCCESS,
  payload: response,
});

export const submitAttemptFailure = (error) => ({
  type: SUBMIT_ATTEMPT_FAILURE,
  payload: error,
});