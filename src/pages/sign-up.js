import React from 'react';
import { connect } from 'react-redux';
import { signUpAction } from '../actions/auth';
import Fieldset from '../components/fieldset';
import Form from '../components/form';

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
    this.props.handleSignUp(values);
  }

  render() {
    return (
      <section id="sign-up">
        <h2>Hi, looks like you're new here!</h2>
        <Form
          button="Create your account"
          errors={this.props.errors}
          initialValues={this.state}
          onSubmit={this.handleSubmit}
        >
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
        </Form>
      </section>
    );
  }
}

export { SignupPage };
export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
