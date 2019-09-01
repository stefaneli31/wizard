import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { updateStore } from '../actions';
import ComponentWithErrorHandling from '../helpers/withError';
import Row from 'react-bootstrap/Row';
import CheckBoxButton from '../components/CheckBoxButton';
import Navigation from '../components/Navigation';

class StepOne extends React.Component {

  onChange = e => {
    this.props.updateStore({[e.target.name]: parseInt(e.target.value, 10)});
  }

  render() {
    const {
      requiredFields,
      genre = '',
      choices,
      choicesIds = [],
      errors = {}
    } = this.props;
    return (
      <Fragment>
          <ComponentWithErrorHandling
            error={errors.genre}
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
                        checked={genre === id}
                        name='genre'
                        label={choice.name}
                        onChange={this.onChange}
                      />
                    )
                  }
                )

              }
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
  const { wizard: {step1} = {} } = state;
  return {
    ...step1,
    choices: state.entities.genres,
    choicesIds: state.entities.genresIds
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { requiredFields = [] } = ownProps;
  return {
    updateStore: (state, fields = requiredFields) => dispatch(updateStore(state, fields))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepOne);