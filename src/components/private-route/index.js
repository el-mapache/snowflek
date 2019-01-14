import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Loading from '../loader';

const PrivateRoute = ({ component: Component, isOptimistic, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          isOptimistic || isAuthenticated ?
          <Loading isLoading={!isAuthenticated}>
            <Component {...props} />
          </Loading> :
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
