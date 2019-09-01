import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { updateStore, resetStepState } from '../actions';
import Navigation from '../components/Navigation';
import CheckBoxButton from '../components/CheckBoxButton';
import Row from 'react-bootstrap/Row';
import ComponentWithErrorHandling from '../helpers/withError';

class StepTwo extends React.Component {

  componentDidUpdate(prevProps) {
    if (prevProps.choicesIds[0] !== this.props.choicesIds[0]) {
      // genre has been changed - reset to default
      this.props.resetStepState(2);
    }
  }

  onChange = e => {
    this.props.updateStore({[e.target.name]: parseInt(e.target.value, 10)});
  }

  render() {
    const {
      subgenre = '',
      requiredFields,
      choices,
      choicesIds = [],
      errors = {}
    } = this.props;
    return (
      <Fragment>
          <ComponentWithErrorHandling
            error={errors.subgenre}
          >
          <Row>
            {
              choicesIds.map(
                id => {
                  const choice = choices[id];
                  return (
                    <CheckBoxButton
                      key={id}
                      id={id}
                      checked={subgenre === id}
                      name='subgenre'
                      label={choice.name}
                      onChange={this.onChange}
                    />
                  )
                }
              )
            }
            <CheckBoxButton
              // let server handle id generation
              // on submission send subgenre data
              id={0}
              onChange={this.onChange}
              name='subgenre'
              label='Add new'
              checked={subgenre === 0}
            />
          </Row>
          </ComponentWithErrorHandling>
          <Navigation
            requiredFields={requiredFields}
          />
        </Fragment>
    );
  }
}

const mapStateToProps = (state, componentProps) => {
  const { wizard: {step2} = {} } = state;
  const choicesIds = (state.wizard.step1.genre && state.entities.genres[state.wizard.step1.genre].subgenres) || [];
  return {
    ...step2,
    choices: state.entities.subgenres,
    choicesIds
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { requiredFields = [] } = ownProps;
  return {
    resetStepState: index => dispatch(resetStepState(index)),
    updateStore: (state, fields = requiredFields) => dispatch(updateStore(state, fields))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepTwo);