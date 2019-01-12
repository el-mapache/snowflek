import React from 'react';
import { connect } from 'react-redux';
import { signInAction } from '../actions/auth';
import Fieldset from '../components/fieldset';
import Form from '../components/form';

const mapStateToProps = ({ auth }) => ({
  errors: auth.errors
});
const mapDispatchToProps = dispatch => ({
  handleSignIn: signInAction(dispatch)
});

class SigninPage extends React.Component {
  state = {
    email: '',
    password: '',
  }

  handleSubmit = (values) => {
    this.props.handleSignIn(values);
  }

  render() {
    return (
      <section id="sign-up">
        <h2>Welcome back! Sign in to your account</h2>
        <Form
          button="Sign in"
          errors={this.props.errors}
          initialValues={this.state}
          onSubmit={this.handleSubmit}
        >
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
        </Form>
      </section>
    );
  }
}


export { SigninPage };
export default connect(mapStateToProps, mapDispatchToProps)(SigninPage);
