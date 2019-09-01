import React from 'react';
import NextButton from '../containers/NextButton';
import PrevButton from '../containers/PrevButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

const Navigation = ({prevLabel, nextLabel, requiredFields}) => (
  <Row className="navigation">
    <Col className="d-flex justify-content-end">
      <PrevButton
        className="left"
      >
       {prevLabel}
      </PrevButton>
      <NextButton
        requiredFields={requiredFields}
        className="right"
      >
        {nextLabel}
      </NextButton>
    </Col>
  </Row>
);

Navigation.defaultProps = {
  prevLabel: <span>Previous</span>,
  nextLabel: 'Next'
}

Navigation.propTypes = {
  prevLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  nextLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  requiredFields: PropTypes.arrayOf(PropTypes.string)
}

export default Navigation;
