import { GO_FORWARD_TO, GO_BACKWARD_TO } from '../actions';

const steps = (currentStep = 1, action) => {
  switch (action.type) {
    case GO_FORWARD_TO:
    case GO_BACKWARD_TO:
      return action.index;
    default:
      return currentStep;
  }
}

export default steps;