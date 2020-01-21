import { Link } from 'react-router-dom';
import Container from '../container';
import Menu from '../menu';
import { connect } from 'react-redux';
import { signOutAction } from '../../actions/auth';
import PropTypes from 'prop-types';
import React from 'react';

import AuthenticatedHeader from './authenticated';
import UnauthenticatedHeader from './unauthenticated';


const mapDispatchToProps = dispatch => () => ({
  handleSignOut: signOutAction(dispatch)
});

class Header extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  renderContextualHeader() {
    console.log(this.props)
    if (this.props.isAuthenticated) { 
      return <AuthenticatedHeader handleSignOut={this.props.handleSignOut} />;
    } else if (this.props.isAuthenticating === false) {
      return <UnauthenticatedHeader />
    }
    
    return null;
  }

  render() {
    return (
      <header className="bg-yellow-droplet border-solid border-b-4 border-yellow-droplet-dark py-1">
        <Menu>
          <Container>
            <Menu.Menu position="left"> 
              <Menu.Item as={Link} to="/">
                <h4>slowdrip</h4>
              </Menu.Item>
            </Menu.Menu>
            {this.renderContextualHeader()}
          </Container>
        </Menu>
      </header>
    );
  }
}

export default connect(state => state, mapDispatchToProps)(Header);
