import React from 'react';
import { Transition, config } from 'react-spring';
import { connect } from 'react-redux';
import { signUpAction } from '../actions/auth';
import Card from '../components/card';
import FieldGroup from '../components/field-group';
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
        <Transition
          config={config.slow}
          from={{ opacity: 0, transform: 'translateY(25%)' }}
          enter={{ opacity: 1, transform: 'translateY(0%)' }}
          leave={{ opacity: 0, transform: 'translateY(25%)' }}
          native
        >
          {() => props => {
            return (
              <Card style={props} className="mx-auto">
                <h3 className="h3 font-extrabold">
                  Hi, looks like you're new here!
                </h3>
                <Form
                  button="Create your account"
                  errors={this.props.errors}
                  initialValues={this.state}
                  onSubmit={this.handleSubmit}
                >
                  <FieldGroup
                    label="Enter your email"
                    name="email"
                    type="email"
                    autoFocus
                  />
                  <FieldGroup
                    label="Choose a password"
                    name="password"
                    type="password"
                  />
                </Form>
              </Card>
            );
          }}
        </Transition>
      
    );
  }
}

export { SignupPage };
export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
