import { connect } from 'react-redux';
import { signOutAction } from '../../actions/auth';
import { withRouter } from 'react-router-dom';
import Menu from '../menu';
import Link from '../link';
import React from 'react';


const isActive = (currentPath, pathToMatch) => {
  return currentPath === pathToMatch;
};

const AuthenticatedHeader = ({ handleSignOut, location }) => {
  return (
    <React.Fragment>          
      <Menu.Item as={Link} to="/friends/requests" active={isActive(location.pathname, '/friends/requests')}>
        See friend requests
      </Menu.Item>
      <Menu.Item as={Link} to="/droplets" active={isActive(location.pathname, '/droplets')}>
        Droplets
      </Menu.Item>
      <Menu.Item as={Link} to="/friends" active={isActive(location.pathname, '/friends')}>
        Friends
      </Menu.Item>
      <Menu.Item
        as={Link}
        to="/sign-out"
        onClick={handleSignOut}
        className="border-solid border-b-2 border-transparent hover:border-purple-droplet"
      >
        Sign out
      </Menu.Item>
    </React.Fragment>
  );
};

export default withRouter(connect(state => state,  dispatch => () => ({
  handleSignOut: signOutAction(dispatch)
}))(AuthenticatedHeader));
