import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { updateStore } from '../actions';
import Navigation from '../components/Navigation';
import Form from 'react-bootstrap/Form';
import ComponentWithErrorHandling from '../helpers/withError';

class StepThree extends React.Component {

  onChange = e => {
    const name = e.target.name;
    let value = null;
    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    } else {
      value = e.target.value
    }
    this.props.updateStore({[name]: value});
  }

  render() {
    const {
      name = '',
      isDescriptionRequired = false,
      requiredFields,
      errors = {}
    } = this.props;
    return (
      <Fragment>
        <ComponentWithErrorHandling
          error={errors.name}
        >
        <Form.Group>
          <Form.Control
            type='text'
            name='name'
            onChange={this.onChange}
            value={name}
            placeholder='Subgenre name'
          />
        </Form.Group>
        </ComponentWithErrorHandling>
        <Form.Group controlId='descRequired'>
          <Form.Check
            onChange={this.onChange}
            type='checkbox'
            label='Is description required for this subgenre'
            name='isDescriptionRequired'
            checked={isDescriptionRequired}
          />
        </Form.Group>
        <Navigation
          requiredFields={requiredFields}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, componentProps) => {
  const { wizard: {step3} = {} } = state;
  return {
    ...step3,
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
)(StepThree);