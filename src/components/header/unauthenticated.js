import { Link } from 'react-router-dom';
import { Button, Menu } from 'semantic-ui-react';
import React from 'react';

const UnauthenticatedHeader = () => {
  return (
    <React.Fragment>
      <Menu.Item>
        <Button inverted color="green">
          <Link to="/sign-up">
            Sign up
          </Link>
        </Button>
      </Menu.Item>
      <Menu.Item as={Link} to="/sign-in">
        Sign in
      </Menu.Item>
    </React.Fragment>
  );
}

export default UnauthenticatedHeader;
