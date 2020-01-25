import React from 'react';
import { Transition, config } from 'react-spring';
import { connect } from 'react-redux';
import { signInAction } from '../actions/auth';
import FieldGroup from '../components/field-group';
import Form from '../components/form';
import Card from '../components/card';


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
      <Transition
        config={config.slow}
        from={{ opacity: 0, transform: 'translateY(25%)' }}
        enter={{ opacity: 1, transform: 'translateY(0%)' }}
        leave={{ opacity: 0, transform: 'translateY(25%)' }}
        native
      >
        {() => style => {
          return (
            <Card style={style} className="mx-auto">
              <h3 className="h3 font-extrabold">
                Welcome back! Please sign in.
              </h3>
              <Form
                button="Sign in"
                errors={this.props.errors}
                initialValues={this.state}
                onSubmit={this.handleSubmit}
              >
                <FieldGroup
                  label="Email"
                  name="email"
                  type="email"
                  autoFocus
                />
                <FieldGroup
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="password"
                />
              </Form>
            </Card>
          );
        }}
      </Transition>
    );
  }
}


export { SigninPage };
export default connect(mapStateToProps, mapDispatchToProps)(SigninPage);
