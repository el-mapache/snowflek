import { Link } from 'react-router-dom';
import Menu from '../menu';
import Button from '../button';
import React from 'react';

const UnauthenticatedHeader = () => {
  return (
    <React.Fragment>
      <Menu.Item>
        <Button secondary large as={Link} to="/sign-in">
          Sign in
        </Button>
      </Menu.Item>
    </React.Fragment>
  );
}

export default UnauthenticatedHeader;
