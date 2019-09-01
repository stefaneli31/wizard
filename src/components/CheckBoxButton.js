import React from 'react';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

const CheckBoxButton = ({id, onChange, checked, name, label}) =>  (
  <Col
    sm={3}
    className="d-flex justify-content-center"
  >
    <input
        onChange={onChange}
        id={id}
        type="radio"
        name={name}
        checked={checked}
        value={id}
      />
    <label
      htmlFor={id}
      className="radio"
    >
      {label}
    </label>
  </Col>
);

CheckBoxButton.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  checked: PropTypes.bool.isRequired,
  onChange:PropTypes.func.isRequired,
  name:PropTypes.string.isRequired
}

export default CheckBoxButton;