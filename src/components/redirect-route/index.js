import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RedirectRoute = ({ component: Component, shouldRedirect, redirectTo, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          shouldRedirect ?
          <Redirect to={redirectTo} /> :
          <Component {...props} />
        );
      }}
    />
  );
};

export default RedirectRoute;
