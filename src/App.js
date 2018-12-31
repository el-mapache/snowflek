import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { setCookie } from './actions/cookie';
import './app.css';

const mapStateToProps = state => state;
const mapDispatchToProps = (dispatch) => ({
  setCookie: setCookie(dispatch)
})

class App extends Component {
  componentDidMount() {
    const csrfToken = this.props.allCookies.csrftoken;
    
    this.props.setCookie(csrfToken);
  }
 
  render() {
    return (
      <div className="app">
        <h1>Slowdrip</h1>
        <Link to="/sign-up">Why not make an account, friend?</Link>
      </div>
    );
  }
}

export { App }
export default connect(mapStateToProps, mapDispatchToProps)(withCookies(App));
