import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { fetchGenres } from '../actions';
import AnimatedVisibility from '../components/AnimatedVisibility';
import Loading from '../components/Loading';
import StepIndicators from '../components/StepIndicators';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import ResponseMessage from './ResponseMessage';

class Wizard extends Component {

  componentDidMount() {
    const { loadGenres } = this.props;
    loadGenres();
  }

  render() {
    const { currentStep, isLoading, newSubgenre, status } = this.props;
    return (
        <Fragment>
          <StepIndicators
            currentStep={currentStep}
            newSubgenre={newSubgenre}
            stepLabels={{
              1: 'Genre',
              2: 'Subgenre',
              3: 'Add new subgenre',
              4: 'Information'
            }}
          />
          <div id='wrapper'>
            <Fragment>
              <AnimatedVisibility
                isVisible={isLoading}
                animateOnMount={true}
              >
                <Loading/>
              </AnimatedVisibility>
              <AnimatedVisibility
                isVisible={
                  !isLoading &&
                  currentStep === 1
                }
              >
                <StepOne requiredFields={['genre']}/>
              </AnimatedVisibility>
              <AnimatedVisibility
                isVisible={currentStep === 2}
              >
                <StepTwo requiredFields={['subgenre']}/>
              </AnimatedVisibility>
              <AnimatedVisibility
                isVisible={currentStep === 3}
              >
                <StepThree requiredFields={['name']}/>
              </AnimatedVisibility>
              <AnimatedVisibility
                isVisible={
                  !isLoading &&
                  currentStep === 4 &&
                  status === ''
                }
              >
                <StepFour requiredFields={['title']}/>
              </AnimatedVisibility>
              <AnimatedVisibility
                isVisible={status !== ''}
                >
                <ResponseMessage status={status}/>
              </AnimatedVisibility>
            </Fragment>
          </div>
        </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentStep: state.currentStep,
    isLoading: state.entities.isLoading,
    newSubgenre: state.wizard.step2.subgenre === 0 ? true : false,
    status: state.wizard.completed
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadGenres: () => dispatch(fetchGenres())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wizard);
