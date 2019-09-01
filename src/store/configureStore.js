import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import updateStoreMiddleware from '../middlewares/updateStore';
import nextStepMiddleware from '../middlewares/nextStep';
import rootReducer from '../reducers';

const configureStore = preloadedState => {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      nextStepMiddleware,
      updateStoreMiddleware,
      thunkMiddleware,
      createLogger()
    )
  );
}


export default configureStore;


