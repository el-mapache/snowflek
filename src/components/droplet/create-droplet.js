import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import Fieldset from '../fieldset';
import { createDroplet } from '../../actions/droplets';
import DropletValidator from '../../validators/droplet';

const getForm = component => el => component.form = el;

const mapStateToProps = state => state;
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
    this.form.setSubmitting(false);
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
                label="what do you want to say?"
                name="content"
                type="textarea"
                rows="6"
                cols="60"
                required
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
