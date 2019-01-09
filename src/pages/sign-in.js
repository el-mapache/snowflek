import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { signInAction } from '../actions/auth';
import Fieldset from '../components/fieldset';

const mapStateToProps = ({ auth }) => ({
  errors: auth.errors
});
const mapDispatchToProps = dispatch => ({
  handleSignIn: signInAction(dispatch)
});

const getForm = component => el => component.form = el;

class SigninPage extends React.Component {
  state = {
    email: '',
    password: '',
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

    if (!Object.keys(formattedErrors).length) {
      this.form.resetForm();
    }

    this.form.setSubmitting(false);
    this.form.setErrors(formattedErrors);
  }

  handleSubmit = (values) => {
    this.props.handleSignIn(values);
  }

  render() {
    return (
      <section id="sign-up">
        <h2>Welcome back! Sign in to your account</h2>
        <Formik
          initialValues={this.state}
          onSubmit={this.handleSubmit}
          ref={getForm(this)}
        >
          {({ handleSubmit, isSubmitting }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Fieldset
                  label="Email"
                  name="email"
                  type="email"
                />
                <Fieldset
                  label="Password"
                  name="password"
                  type="password"
                />
                <div>
                  <button type="submit" disabled={isSubmitting}>
                    Sign in
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


export { SigninPage };
export default connect(mapStateToProps, mapDispatchToProps)(SigninPage);
