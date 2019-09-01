import { connect } from 'react-redux';
import Button from '../components/Button';
import { goBackwardToIfPossible } from '../actions';

const mapStateToProps = (state, ownProps) => {
  const disabled = state.currentStep === 1;
  return {
    className: `${ownProps.className || ''} ${disabled ? 'disabled' : ''}`
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: e => {
      e.preventDefault();
      return dispatch(goBackwardToIfPossible());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button);