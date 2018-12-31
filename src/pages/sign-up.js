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

  handleSubmit = (values) => {
    console.log('formmm', values)
    this.props.handleSignUp(this.state, this.props.allCookies.csrftoken);
  }

  render() {
    return (
      <section id="sign-up">
        <h2>Please create an account</h2>
        <Formik initialState={this.state}>
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
