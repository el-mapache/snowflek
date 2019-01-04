import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import Fieldset from '../fieldset';
import { createDroplet } from '../../actions/droplets';

const getForm = component => el => component.form = el;

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  handleSubmit: createDroplet(dispatch),
});

class CreateDroplet extends React.Component {
  state = {
    content: ''
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
        validate={(values) => {
          let errors = {};

          if (!values.content) {
            errors.content =  'Droplet can\'t be blank';
          }

          return errors
        }}
      >
        {({ handleSubmit, isSubmitting }) => {
          return (
            <form onSubmit={handleSubmit}>
              <h3>Hey friend, why not write something today?</h3>
              <Fieldset
                label="what do you want to say?"
                name="content"
                type="text"
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
