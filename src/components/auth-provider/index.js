import React from 'react';
import cookieSelector from '../../utils/cookie-selector';
import { connect } from 'react-redux';
import { setHeadersAction } from '../../actions/auth';

class Auth extends React.Component {
  componentDidMount() {
    const headers = cookieSelector.getAuthHeaders();

    if (headers) {
      this.props.setAuthHeaders(headers);
    }
  }

  render() {
    return this.props.children(this.props.isAuthenticated);
  }
}

const mapStateToProps = ({ auth }) => auth;
const mapDispatchToProps = dispatch => ({
  setAuthHeaders: setHeadersAction(dispatch),
});

const AuthProvider = connect(mapStateToProps, mapDispatchToProps)(Auth);

export default AuthProvider;
