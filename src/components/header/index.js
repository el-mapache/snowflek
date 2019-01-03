import React from 'react';
import { connect } from 'react-redux';
import { signOutAction } from '../../actions/auth';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => () => ({
  handleSignOut: signOutAction(dispatch)
});

class Header extends React.Component {
  render() {
    return (
      <nav>
        <button type="button" onClick={this.props.handleSignOut}>Sign out</button>
      </nav>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
