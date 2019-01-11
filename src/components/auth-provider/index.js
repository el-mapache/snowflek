import React from 'react';
import { connect } from 'react-redux';
import cookieSelector from '../../utils/cookie-selector';
import { verifyToken } from '../../actions/auth';
import Loader from '../loader';

const mapStateToProps = ({ auth }) => auth;
const mapDispatchToProps = dispatch => ({
  verifyToken: verifyToken(dispatch),
});

class Auth extends React.Component {
  componentDidMount() {
    const headers = cookieSelector.getAuthHeaders();

    if (headers) {
      this.props.verifyToken({
        uid: headers.uid,
        client: headers.client,
        'access-token': headers['access-token'],
      });
    }
  }

  render() {
    console.log(this.props)
    return ( 
      this.props.children(this.props.isAuthenticated, this.props.isLoading)
    );
  }
}

const AuthProvider = connect(mapStateToProps, mapDispatchToProps)(Auth);

export default AuthProvider;
