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


class SignupPage extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleSubmit = () => {
    this.props.handleSignUp(this.state);
  }

  render() {
    return (
      <section id="sign-up">
        <h2>Please create an account</h2>
        <Formik initialValues={this.state} onSubmit={this.handleSubmit}>
          { ({ handleSubmit }) => {
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
                  <button type="submit">
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
