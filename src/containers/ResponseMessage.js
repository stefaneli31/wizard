import React from 'react';
import { connect } from 'react-redux';
import { resetWizard } from '../actions';
import PropTypes from 'prop-types';
import { FaCheck, FaExclamation } from 'react-icons/fa';
import Button from '../components/Button';
import CircleWithLabel from '../components/CircleWithLabel';
import '../assets/ResponseMessage.css';

const Response = ({status, onClick}) => {
  let label, icon, buttonLabel = null;
  if (status === '') {
    return null;
  }
  if (status === 'success') {
    label = 'Book added successfully';
    buttonLabel = 'Add another book';
    icon = <FaCheck/>;
  } else {
    label = 'Ooops something went wrong...'
    buttonLabel = 'Try again';
    icon = <FaExclamation/>;
  }
  return (
    <div className={`response ${status}`}>
      <CircleWithLabel
        label={label}
        circleText={icon}
      />
      <Button
        onClick={onClick}
        >
        {buttonLabel}
      </Button>
    </div>
  );
};

Response.propTypes = {
  status: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => dispatch(resetWizard())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Response);