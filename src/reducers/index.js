import { combineReducers } from 'redux';
import wizard from './wizard';
import entities from './entities';
import nav from './nav';
import { RESET_WIZARD } from '../actions';

/*
  store = {
    entites: {
      genres: {},
      genresIds: [],
      subgenres: {},
      isLoading: true
    },
    currentStep: 1,
    wizard: {
      step1 : {

      },
      step2 : {

      },
      step3 : {

      },
      step4 : {

      }
      completed: ''
    }
  }
 */

const appReducer = combineReducers({
  entities,
  wizard,
  currentStep: nav
});

const rootReducer = (state, action) => {
  if (action.type === RESET_WIZARD) {
    const { entities } = state;
    state = { entities };
  }
  return appReducer(state, action);
}

export default rootReducer;