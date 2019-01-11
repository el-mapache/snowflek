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
    return (
      <Loader isLoading={this.props.isLoading}>
        { this.props.children(this.props.isAuthenticated) }
      </Loader>
    );
  }
}

const AuthProvider = connect(mapStateToProps, mapDispatchToProps)(Auth);

export default AuthProvider;
