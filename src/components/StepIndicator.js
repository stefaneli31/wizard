import React from 'react';
import CircleWithLabel from './CircleWithLabel';
import PropTypes from 'prop-types';

const StepIndicator = ({className, index, label}) => (
  <CircleWithLabel
    className={`step-indicator ${className}`}
    circleText={index}
    label={label}
  />
);

StepIndicator.defaultProps = {
  className: '',
  label: '',
  index: '...'
}

StepIndicator.propTypes = {
  className: PropTypes.string,
  index: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  label: PropTypes.string
}

export default StepIndicator;