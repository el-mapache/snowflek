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
                <Menu.Item>
                  <Link to="/droplets">
                    <h4>slowdrip</h4>
                  </Link>
                </Menu.Item>
              </Menu.Menu>
              
              <Menu.Item as={() =>
                <Link className="item link" to="/friends/requests">
                  See friend requests
                </Link>
              } />
              <Menu.Item active={this.state.activeItem === "droplets"}>
                <Link to="/droplets">Droplets</Link>
                </Menu.Item>
              <Menu.Item>
                <Link to="/friends/2/droplets">Friend</Link>
              </Menu.Item>
              <Menu.Item as="span">
                <Button
                  onClick={this.props.handleSignOut}
                  className="inverted gray"
                >
                    Sign out
                </Button>
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
