import React from 'react';
import PropTypes from 'prop-types';
import StepIndicator from './StepIndicator';
import '../assets/StepIndicators.css';

const createSteps = (currentStep, newSubgenre, stepLabels) => {
  const steps = [];
  /*
    1 -> current + undefFuture
    2 -> done + current + undefFuture
    3 -> done + done + current + future
    4 -> done + done + [done|nothing] + current
   */
  for (let i = 1; i <= currentStep; i++) {
    let index = i;
    if (!newSubgenre) {
      if (i === 3) {
        continue;
      }
      if (i === 4) {
        index = 3;
      }
    }
    steps.push(
      <StepIndicator
        key={i}
        className={currentStep === i ? 'current' : 'done'}
        label={stepLabels[i]}
        index={index}
      />
    );
  }
  switch (currentStep) {
    case 1:
    case 2:
      steps.push(
        <StepIndicator
          key={currentStep+1}
          className='future'
        />
      );
      break;
    case 3:
      steps.push(
        <StepIndicator
          label={stepLabels[4]}
          key={currentStep+1}
          index={4}
          className='future'
        />
      );
      break;
    default:
      break;
  }
  return steps;
}

const StepIndicators = ({currentStep, newSubgenre, stepLabels}) => (
  <div className="step-indicators">
  {
    createSteps(currentStep, newSubgenre, stepLabels)
  }
  </div>
)


StepIndicators.propTypes = {
  newSubgenre: PropTypes.bool.isRequired,
  currentStep: PropTypes.number.isRequired,
  stepLabels: PropTypes.object.isRequired
}

export default StepIndicators;