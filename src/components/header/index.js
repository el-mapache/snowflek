import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Menu,
  Segment,
  Sticky,
} from 'semantic-ui-react';
import { signOutAction } from '../../actions/auth';
import Button from '../button';

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

  render() {
    return (
      this.props.isAuthenticated ?
        <Segment inverted>
          <Menu secondary inverted pointing size="large">
            <Container>
              <Menu.Menu position="left">
                <Menu.Item as={Link} to="/droplets">
                  <h4>slowdrip</h4>
                </Menu.Item>
              </Menu.Menu>
              
              <Menu.Item as={Link} to="/friends/requests">
                See friend requests
              </Menu.Item>
              <Menu.Item as={Link} active={this.state.activeItem === "droplets"} to="/droplets">
                Droplets
              </Menu.Item>
              <Menu.Item as={Link} to="/friends/2/droplets">
                Friends
              </Menu.Item>
              <Menu.Item as={Button} onClick={this.props.handleSignOut} className="inverted gray">
                Sign out
              </Menu.Item>
            </Container>
          </Menu>
        </Segment>
       :
      null
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
