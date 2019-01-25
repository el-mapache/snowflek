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
  // TODO not sure this is the best way to encode the idea of allowing
  // routing to continue, but for no information to be loaded, until
  // the user is authenticated. `optimistic` acts as
  // another gate to prevent multiple routing calls. For example,
  // if a user has a valid auth token, and attempts to view their droplets
  // page, the front end will first redirect them to the signin page, then
  // back to droplets. This occurs because the PrivateRoute component
  // relies on a separate flag to indicate if the user is authenticated or not.
  // In the case of the user first visting the app, the store will not have been
  // bootstrapped, and the user won't be 'authenticated', even if valid authentication
  // cookies exist in their browser. This issue would be solved w/ server side rendering
  // Consider moving to reducer or to a new component / hoc?
  // 
  state = {
    optimistic: true,
  }

  componentDidMount() {
    const headers = cookieSelector.getAuthHeaders();

    if (headers) {      
      this.props.verifyToken({
        uid: headers.uid,
        client: headers.client,
        'access-token': headers['access-token'],
      });
    } else {
      this.setState({ optimistic: false });
    }
  }

  componentDidUpdate() {
    if (!this.props.authHeaders && this.state.optimistic) {
      this.setState({ optimistic: false });
    }
  }

  render() {
    return (
      
        this.props.children(this.props.isAuthenticated, this.state.optimistic)
      
    );
  }
}

const AuthProvider = connect(mapStateToProps, mapDispatchToProps)(Auth);

export { Auth };
export default AuthProvider;
