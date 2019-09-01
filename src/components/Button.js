import React from 'react';
import PropTypes from 'prop-types';
import '../assets/Button.css';

const Button = ({children, onClick, className = ''}) => (
  <button
    onClick={e => onClick(e)}
    className={`button ${className}`}
  >
    {
      children
    }
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  // injected by redux
  onClick: PropTypes.func.isRequired
}

export default Button;