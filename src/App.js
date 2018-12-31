import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import { signUpAction } from './actions/auth';
import './app.css';

class Input extends Component {
  static defaultProps = {
    type: 'text'
  }

  render() {
    return (
      <div>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input
          type={this.props.type}
          onChange={this.props.onChange}
          value={this.props.value}
          name={this.props.name}
        />
      </div>
    );
  }
}

class App extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.handleSignUp(this.state, this.props.allCookies.csrftoken);
  }

  render() {
    return (
      <div className="app">
        <form onSubmit={this.handleSubmit}>
          <input type="hidden" name="authenticity_token" value={this.props.allCookies.csrftoken} readOnly />
          <Input
            label="please provide your email"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <Input
            label="enter a password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  handleSignUp: signUpAction(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(App));
