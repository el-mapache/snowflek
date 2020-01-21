import { withRouter } from 'react-router-dom';
import Menu from '../menu';
import Button from '../button';
import Link from '../link';
import React from 'react';


const isActive = (currentPath, pathToMatch) => {
  return currentPath === pathToMatch;
};

const AuthenticatedHeader = ({ handleSignOut, location }) => {
  return (
    <React.Fragment>          
      <Menu.Item active={isActive(location.pathname, '/friends/requests')}>
        <Link to="/friends/requests">
          See friend requests
        </Link>
      </Menu.Item>
      <Menu.Item active={isActive(location.pathname, '/droplets')}>
        <Link to="/droplets">
          Droplets
        </Link>
      </Menu.Item>
      <Menu.Item active={isActive(location.pathname, '/friends')}>
        <Link to="/friends">
          Friends
        </Link>
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

export default withRouter(AuthenticatedHeader);
