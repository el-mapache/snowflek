import { Link } from 'react-router-dom';
import {
  Container,
  Menu,
  Segment,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { signOutAction } from '../../actions/auth';
import PropTypes from 'prop-types';
import React from 'react';

import AuthenticatedHeader from './authenticated';
import UnauthenticatedHeader from './unauthenticated';


const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => () => ({
  handleSignOut: signOutAction(dispatch)
});

class Header extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  state = {
    activeItem: 'droplets'
  }

  renderContextualHeader() {
    return this.props.isAuthenticated ?
      <AuthenticatedHeader handleSignOut={this.props.handleSignOut} /> :
      <UnauthenticatedHeader />
  }

  render() {
    return (
      <Segment inverted>
        <Menu secondary inverted pointing size="large">
          <Container>
            <Menu.Menu position="left">
              <Menu.Item as={Link} to="/droplets">
                <h4>slowdrip</h4>
              </Menu.Item>
            </Menu.Menu>
            {this.renderContextualHeader()}
          </Container>
        </Menu>
      </Segment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
