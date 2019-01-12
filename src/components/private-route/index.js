import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isOptimistic, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          isOptimistic || isAuthenticated ?
          <Component {...props} /> :
          <Redirect to={{
            pathname: '/sign-in',
            state: { from: props.location }
          }} />
        );
      }}
    />
  );
};

export default PrivateRoute;
