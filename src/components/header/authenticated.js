import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
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
      <Menu.Item>
        <Button onClick={handleSignOut} className="inverted gray">
          Sign out
        </Button>
      </Menu.Item>
    </React.Fragment>
  );
};

export default withRouter(AuthenticatedHeader);
