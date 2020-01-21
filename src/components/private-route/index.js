import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Loading from '../loader';

const isOptimisticallyAuthenticated = (authenticating, authenticated) =>
  authenticating || authenticated;

const PrivateRoute = ({ component: Component, isAuthenticating, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props ) => {
        let renderedComponent = (
          <Redirect to={{
            pathname: '/',
            state: { from: props.location }
          }} />
        );

        if (isOptimisticallyAuthenticated(isAuthenticating, isAuthenticated)) {
          renderedComponent = (
            <Loading isLoading={!isAuthenticated}>
              <Component {...props} />
            </Loading>
          );
        }
        return renderedComponent
      }}
    />
  );
};

export default PrivateRoute;
