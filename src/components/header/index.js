import { Link } from 'react-router-dom';
import Container from '../container';
import Menu from '../menu';
import PropTypes from 'prop-types';
import React from 'react';

import AuthenticatedHeader from './authenticated';
import UnauthenticatedHeader from './unauthenticated';


class Header extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  state = {
    resetActive: false
  }

  renderContextualHeader() {
    if (this.props.isAuthenticated) { 
      return <AuthenticatedHeader />;
    } else if (this.props.isAuthenticating === false) {
      return <UnauthenticatedHeader />
    }
    
    return null;
  }

  render() {
    return (
      <header className="bg-yellow-droplet border-solid border-b-4 border-yellow-droplet-dark">
        <Menu>
          <Container>
            <Menu.Menu position="left"> 
              <Menu.Item as={Link} to="">
                <h4 className="h4">slowdrip</h4>
              </Menu.Item>
            </Menu.Menu>
            {this.renderContextualHeader()}
          </Container>
        </Menu>
      </header>
    );
  }
}

export default Header;
