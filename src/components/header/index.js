import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOutAction } from '../../actions/auth';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => () => ({
  handleSignOut: signOutAction(dispatch)
});

class Header extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  render() {
    return (
      this.props.isAuthenticated ?
      <nav>
        <button type="button" onClick={this.props.handleSignOut}>Sign out</button>
        <Link to="friends/requests">See friend requests</Link>
      </nav> :
      null
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
