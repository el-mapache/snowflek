import { connect } from 'react-redux';
import { setCookie } from './actions/cookie';
import { withCookies } from 'react-cookie';
import Container from './components/container';
import React from 'react';


const mapStateToProps = state => state;
const mapDispatchToProps = (dispatch) => ({
  setCookie: setCookie(dispatch)
})

class App extends React.Component {
  componentDidMount() {
    const csrfToken = this.props.allCookies.csrftoken;

    this.props.setCookie(csrfToken);
  }
 
  render() {
    return <Container as="main" {...this.props} />;
  }
}

export { App }
export default connect(mapStateToProps, mapDispatchToProps)(withCookies(App));
