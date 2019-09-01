import { connect } from 'react-redux';
import Button from '../components/Button';
import { goForwardToIfAllowed } from '../actions';
import { isNotEmpty } from '../utils/validators';

const mapStateToProps = (state, ownProps) => {
  let disabled = false;
  const requiredFields = ownProps.requiredFields;
  const { wizard, currentStep } = state;
  if (requiredFields && requiredFields.length > 0) {
    for (let i = 0; i < requiredFields.length; i++) {
      const name = requiredFields[i];
      if (!isNotEmpty(wizard[`step${currentStep}`][name])) {
        disabled = true;
        break;
      }
    }
  }
  return {
    className: `${ownProps.className || ''} ${disabled ? 'disabled' : ''}`
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: e => {
      e.preventDefault();
      return dispatch(goForwardToIfAllowed(ownProps.requiredFields));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button);