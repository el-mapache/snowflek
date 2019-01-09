import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import Fieldset from '../fieldset';
import { createDroplet } from '../../actions/droplets';
import DropletValidator from '../../validators/droplet';

const getForm = component => el => component.form = el;

const mapStateToProps = ({ droplets }) => {
  return { errors: droplets.errors };
};

const mapDispatchToProps = dispatch => ({
  handleSubmit: createDroplet(dispatch),
});

const handleValidation = (values) => {
  const validator = DropletValidator(values);
  let errors = {};

  if (!validator.hasContent()) {
    errors.content =  'Droplet can\'t be blank';
  } else if (!validator.atMaxLength()) {
    errors.content = 'A droplet is limited to 300 characters.';
  }

  return errors
}

class CreateDroplet extends React.Component {
  state = {
    content: ''
  }

  componentDidUpdate() {
    const serverErrorsList = Object.entried(this.props.errors);
    // TODO: this can all be encapsulated in a component
    // will want the form to take prefixes as well, in case nested errors are needed
    const formattedErrors = serverErrorsList.reduce((memo, [name, message]) => {
      return {
        ...memo,
        [name]: `${message}`,
      };
    }, {});

    if (!Object.keys(formattedErrors).length) {
      this.form.resetForm();
    }

    this.form.setSubmitting(false);
    this.form.setErrors(formattedErrors);
  }
 
  handleSubmit = (values) => {
    this.props.handleSubmit(values);
  }

  render() {
    return (
      <Formik
        initialValues={this.state}
        onSubmit={this.handleSubmit}
        ref={getForm(this)}
        validate={handleValidation}
      >
        {({ handleSubmit, isSubmitting }) => {
          return (
            <form onSubmit={handleSubmit}>
              <h3>Hey friend, why not write something today?</h3>
              <Fieldset
                label="What's on your mind today?"
                name="content"
                type="textarea"
                rows="6"
                cols="60"
              />
              <div>
                <button type="submit" disabled={isSubmitting}>
                  create droplet
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDroplet);
