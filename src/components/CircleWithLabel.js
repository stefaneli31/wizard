import React from 'react';
import PropTypes from 'prop-types';
import '../assets/Circle.css';

const CircleWithLabel = ({circleText, label, className = ''}) => (
  <div className={`circle-with-label ${className}`}>
    <div className='circle'>{circleText}</div>
    {label && <div className='label'>{label}</div>}
  </div>
);

CircleWithLabel.propTypes = {
  circleText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired
}

export default CircleWithLabel;
