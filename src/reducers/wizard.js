import merge from 'lodash/merge';
import {
  UPDATE_STEP_FIELD,
  VALIDATION_ERROR,
  RESET_STEP_STATE,
  RESET_STEP_ERRORS,
  SUBMIT_BOOK_SUCCESS,
  SUBMIT_BOOK_FAILED
} from '../actions';

const wizardDefaultState = {
  step1: {},
  step2: {},
  step3: {},
  step4: {},
  completed: ''
}

const wizard = (state = wizardDefaultState, action) => {
  switch (action.type) {
    case UPDATE_STEP_FIELD:
      return merge(
        {},
        state,
        {[`step${action.currentStep}`]: {
          ...action.field,
          errors: action.errors
        }}
      );
    case VALIDATION_ERROR:
      return merge(
        {},
        state,
        {[`step${action.currentStep}`]: {
          errors: action.errors
        }}
      );
    case RESET_STEP_STATE:
      return Object.assign(
        {},
        state,
        {[`step${action.index}`]: {}}
      )
    case RESET_STEP_ERRORS:
      const newStepState = Object.assign(
        {},
        {...state[`step${action.index}`]},
        {errors: {}}
      );

      return Object.assign(
        {},
        state,
        {
          [`step${action.index}`]:newStepState
        }
      );
    case SUBMIT_BOOK_SUCCESS:
      return Object.assign({}, state, {completed: 'success'});
    case SUBMIT_BOOK_FAILED:
      return Object.assign({}, state, {completed: 'failed'});
    default:
      return state;
  }
}

export default wizard;