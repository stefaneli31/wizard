import { GO_FORWARD_TO } from '../actions';
import { submitForm } from '../actions';
import { MAX_STEPS } from '../utils';

const nextStepMiddleware = ({dispatch, getState}) => next => action => {
  if (action.type !== GO_FORWARD_TO) {
    return next(action);
  }
  const { currentStep, wizard } = getState();
  if (currentStep !== MAX_STEPS) {
    return next(action);
  }
  dispatch(submitForm(wizard));
};

export default nextStepMiddleware;