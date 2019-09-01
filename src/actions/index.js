import { getPreviousStepIndex, getNextStepIndex, fakeFetch } from '../utils';
import { normalize, schema } from "normalizr";
import data from '../data';
import { ERROR_MESSAGES, isNotEmpty } from '../utils/validators';

export const RESET_WIZARD = 'RESET_WIZARD';
export const UPDATE_STEP_FIELD = 'UPDATE_STEP_FIELD';
export const VALIDATION_ERROR = 'VALIDATION_ERROR';
export const GO_FORWARD_TO = 'GO_FORWARD_TO';
export const GO_BACKWARD_TO = 'GO_BACKWARD_TO';
export const GENRES_REQUEST = 'GENRES_REQUEST';
export const GENRES_SUCCESS = 'GENRES_SUCCESS';
export const GENRES_FAILED = 'GENRES_FAILED';
export const RESET_STEP_STATE = 'RESET_STEP_STATE';
export const RESET_STEP_ERRORS = 'RESET_STEP_ERRORS';
export const SUBMIT_SUBGENRE = 'SUBMIT_SUBGENRE';
export const SUBMIT_SUBGENRE_SUCCESS = 'SUBMIT_SUBGENRE_SUCCESS';
export const SUBMIT_SUBGENRE_FAILED = 'SUBMIT_SUBGENRE_FAILED';
export const SUBMIT_BOOK = 'SUBMIT_BOOK';
export const SUBMIT_BOOK_SUCCESS = 'SUBMIT_BOOK_SUCCESS';
export const SUBMIT_BOOK_FAILED = 'SUBMIT_BOOK_FAILED';

const validationError = (errors, currentStep) => {
  return {
    type: VALIDATION_ERROR,
    errors,
    currentStep
  }
}

const goForwardTo = (index) => {
  return {
    type: GO_FORWARD_TO,
    index
  }
};

const goBackwardTo = (index) => {
  return {
    type: GO_BACKWARD_TO,
    index
  }
};


export const goBackwardToIfPossible = () => (dispatch, getState) => {
  const index = getPreviousStepIndex(getState());
  return dispatch(goBackwardTo(index));
}

// requiredFields is an array of required fields names passed as requiredFields prop (<NavButton/>)
// goToIfAllowed is called on onClick event
export const goForwardToIfAllowed = (requiredFields = []) => (dispatch, getState) => {
  const { wizard, currentStep } = getState();
  let errors = {};
  let hasError = false;
  if (requiredFields.length > 0) {
    for (let i = 0; i < requiredFields.length; i++) {
      const name = requiredFields[i];
      if (!isNotEmpty(wizard[`step${currentStep}`][name])) {
        hasError = true;
        errors[name] = ERROR_MESSAGES.required;
      }
    }
    if (hasError) {
      return dispatch(validationError(errors, currentStep))
    }
  }
  const index = getNextStepIndex(getState());
  return dispatch(goForwardTo(index));
}

// splitting each step submission as a separate action?
export const updateStore = (field, requiredFields, currentStep) => {
  return {
    type: UPDATE_STEP_FIELD,
    currentStep,
    field,
    requiredFields
  }
}

export const resetStepState = index => {
  return {
    type: RESET_STEP_STATE,
    index
  }
}

export const resetStepErrors = index => {
  return {
    type: RESET_STEP_ERRORS,
    index
  }
}

export const resetWizard = () => {
  return {
    type: RESET_WIZARD
  }
}

const subgenres = new schema.Entity('subgenres');
const genres = new schema.Entity('genres', {
  subgenres: [subgenres]
});

const requestGenres = () => {
  return {
    type: GENRES_REQUEST
  }
}

const successGenres = data => {
  return {
    type: GENRES_SUCCESS,
    data
  }
}

const failedGenres = error => {
  return {
    type: GENRES_FAILED,
    error
  }
}

export const fetchGenres = () => {
  return dispatch => {
    dispatch(requestGenres());
    return fakeFetch()
      .then(() => normalize(data.genres, [genres]))
      .then(normalizedData => dispatch(successGenres(normalizedData)))
      .catch(e => dispatch(failedGenres(e.message)))
  }
}


function submitSubgenre() {
  return {
    type: SUBMIT_SUBGENRE
  }
}

function submitSubgenreSuccess(payload) {
  return {
    type: SUBMIT_SUBGENRE_SUCCESS,
    payload
  }
}

function submitSubgenreFailed() {
  return {
    type: SUBMIT_SUBGENRE_FAILED
  }
}

function submitBook() {
  return {
    type: SUBMIT_BOOK
  }
}

function submitBookSuccess(payload) {
  return {
    type: SUBMIT_BOOK_SUCCESS,
    payload
  }
}

function submitBookFailed() {
  return {
    type: SUBMIT_BOOK_FAILED
  }
}

export const submitForm = data => {
  let subGenreData = null;
  if (data.step2.subgenre === 0) {
    const { errors, ...stepThreeData} = data.step3;
    subGenreData = stepThreeData;
    subGenreData.genre = data.step1.genre; // include parent genre id
  }
  // const stepsData = Object.assign({}, data);
  // delete stepsData.step3
  const bookData = Object.values(data).reduce((result, step, index) => {
    if (Object.keys(data)[index] === 'step3') {
      // do not include subgenre meta in a book data
      return Object.assign(result, {});
    }
    const {errors, ...stepData} = step;
    return Object.assign(result, stepData);
  }, {});
  return dispatch => {
    function processBook() {
      dispatch(submitBook());
      return fakeFetch(bookData)
        .then(() => dispatch(submitBookSuccess(bookData)))
    }
    if (subGenreData) {
      dispatch(submitSubgenre()); // start
      return fakeFetch(subGenreData) // fake post
        .then(response => {
            response = subGenreData;
            response.id = Date.now(); // generate fake ID
            dispatch(submitSubgenreSuccess(response));
            // return response.id;
            return response.id;
          }
        )
        .catch(err => {
          dispatch(submitSubgenreFailed());
          throw new Error(SUBMIT_SUBGENRE_FAILED);
        })
        .then(subGenreId => {
          bookData.subgenre = subGenreId;
          return bookData;
        })
        .then(data => processBook())
        .catch(() => dispatch(submitBookFailed()))
    } else {
      processBook()
      .catch(() => dispatch(submitBookFailed()))
    }
  }
}