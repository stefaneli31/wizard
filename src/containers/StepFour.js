import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { updateStore, resetStepErrors } from '../actions';
import Navigation from '../components/Navigation';
import Form from 'react-bootstrap/Form';
import ComponentWithErrorHandling from '../helpers/withError';
import DateTimePicker from 'react-datetime-picker';

class StepFour extends React.Component {

  constructor(props) {
    super(props);
    this.authors = [];
    this.publishers = [];
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.requiredFields[1] !== this.props.requiredFields[1]
    ) {
      // clear previous errors if subgenre has been changed (user navigated back)
      // and if that new subgenre requires description
      this.props.resetStepErrors(4);
    }
  }

  componentDidMount() {
    // should be fetched here
    this.authors = [{
      id: 1,
      name: 'Author 1'
    }, {
      id: 2,
      name: 'Author 2'
    }, {
      id: 3,
      name: 'Author 3'
    }, {
      id: 4,
      name: 'Author 4'
    }, {
      id: 5,
      name: 'Author 5'
    }];
    this.publishers = [{
      id: 1,
      name: 'Publisher 1'
    }, {
      id: 2,
      name: 'Publisher 2'
    }, {
      id: 3,
      name: 'Publisher 3'
    }, {
      id: 4,
      name: 'Publisher 4'
    }, {
      id: 5,
      name: 'Publisher 5'
    }];
  }

  onDateChange = published => {
    // separate handler since date picker is passing Date object only
    this.props.updateStore({published});
  }

  onChange = e => {
    const name = e.target.name;
    let value = null;
    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }
    if (value && !isNaN(value)) {
      value = parseFloat(value);
    }
    this.props.updateStore({[name]: value}, this.props.requiredFields);
  }

  render() {
    const {
      description = '',
      published = '',
      requiredFields,
      title = '',
      publisher = '',
      isbn = '',
      author = '',
      errors = {}
    } = this.props;
    return (
      <Fragment>
        <ComponentWithErrorHandling
          error={errors.title}
        >
          <Form.Group controlId='title'>
            <Form.Label>Book title</Form.Label>
            <Form.Control
              name='title'
              onChange={this.onChange}
              type='text'
              value={title}
              placeholder='Book title'
            />
          </Form.Group>
        </ComponentWithErrorHandling>
        <Form.Group controlId='author'>
          <Form.Label>Author</Form.Label>
          <Form.Control
            as='select'
            onChange={this.onChange}
            value={author}
            name='author'
            >
            {this.authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='ISBN'>
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type='text'
            onChange={this.onChange}
            name='isbn'
            value={isbn}
            placeholder='ISBN'
          />
        </Form.Group>
        <Form.Group controlId='publisher'>
          <Form.Label>Publisher</Form.Label>
          <Form.Control
            as='select'
            onChange={this.onChange}
            name='publisher'
            value={publisher}
          >
            {this.publishers.map(author => <option key={author.id} value={author.id}>{author.name}</option>)}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='published'>
          <Form.Label>Date published</Form.Label>
          <DateTimePicker
            id='published'
            onChange={this.onDateChange}
            name='published'
            format='d/M/y'
            value={published}
          />
        </Form.Group>
        <ComponentWithErrorHandling
          error={errors.description}
        >
          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              rows='3'
              name='description'
              value={description}
              onChange={this.onChange}
            />
          </Form.Group>
        </ComponentWithErrorHandling>
        <Navigation
          requiredFields={requiredFields}
          nextLabel='Complete'
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { wizard } = state;
  const { step2 = {}, step3 = {}, step4 = {}} = wizard;
  let requiredFields = ownProps.requiredFields || [];
  if (
    (
      step2.subgenre === 0 &&
      step3.isDescriptionRequired
    ) ||
    (
      step2.subgenre &&
      step2.subgenre !== 0 &&
      state.entities.subgenres[step2.subgenre].isDescriptionRequired
    )
  ) {
    if (!requiredFields.includes('description')) {
      requiredFields.push('description');
    }
  }
  return {
    ...step4,
    requiredFields
  };
}


const mapDispatchToProps = (dispatch, ownProps) => {
  const { requiredFields = [] } = ownProps;
  return {
    resetStepErrors: index => dispatch(resetStepErrors(index)),
    updateStore: (state, fields = requiredFields) => dispatch(updateStore(state, fields))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepFour);