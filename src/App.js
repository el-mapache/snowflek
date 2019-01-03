import { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
// import { Link } from 'react-router-dom';
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
    return this.props.children;
  }
}

export { App }
export default connect(mapStateToProps, mapDispatchToProps)(withCookies(App));
