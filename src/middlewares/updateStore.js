import { UPDATE_STEP_FIELD } from '../actions';
import { ERROR_MESSAGES, isNotEmpty } from '../utils/validators';

const updateStoreMiddleware = ({dispatch, getState}) => next => action => {
  if (action.type !== UPDATE_STEP_FIELD) {
    return next(action);
  }
  const { field, requiredFields } = action;

  const name = Object.keys(field)[0]; // get name of the field
  // field value is required
  if (requiredFields.length > 0 &&
    requiredFields.includes(name)) {
    action.errors = {
      [name]: isNotEmpty(field[name]) ? '' : ERROR_MESSAGES.required
    }
  }
  const { currentStep } = getState();
  action.currentStep = currentStep;
  delete action.requiredFields;
  next(action);
};

export default updateStoreMiddleware;