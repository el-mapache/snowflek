import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RedirectRoute = ({ component: Component, isLoading, shouldRedirect, redirectTo, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoading) return null;

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
