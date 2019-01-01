import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { signUpAction } from '../actions/auth';
import Fieldset from '../components/fieldset';

const mapStateToProps = ({ auth }) => ({
  errors: auth.errors
});

const mapDispatchToProps = dispatch => ({
  handleSignUp: signUpAction(dispatch)
});

const getForm = component => el => component.form = el;

class SignupPage extends React.Component {
  state = {
    email: '',
    password: ''
  }

  componentDidUpdate() {
    const serverErrors = this.props.errors;
    // TODO: this can all be encapsulated in a component
    // will want the form to take prefixes as well, in case nested errors are needed
    const formattedErrors = Object.entries(serverErrors).reduce((memo, [name, message]) => {
      return { 
        ...memo,
        [name]: `${name} ${message}`,
      };
    }, {});
    
    // TODO: why do you have to manage this yourself??
    this.form.setSubmitting(false);
    this.form.setErrors(formattedErrors)
  }

  handleSubmit = (values) => {
    this.props.handleSignUp(values);
  }

  render() {
    return (
      <section id="sign-up">
        <h2>Please create an account</h2>
        <Formik
          initialValues={this.state}
          onSubmit={this.handleSubmit}
          ref={getForm(this)}
        >
          {({ handleSubmit, isSubmitting }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Fieldset
                  label="Enter your email"
                  name="email"
                  type="email"
                />
                <Fieldset
                  label="Choose a password"
                  name="password"
                  type="password"
                />
                <div>
                  <button type="submit" disabled={isSubmitting}>
                    Sign up!
                  </button>
                </div>
              </form>
            );
          } }
        </Formik>
      </section>
    );
  }
}


export { SignupPage };
export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
