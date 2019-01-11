import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isLoading, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log('why am i redirecting', isLoading, isAuthenticated)
        if (!isLoading && !isAuthenticated) {
          return (
            <Redirect to={{
              pathname: '/sign-in',
              state: { from: props.location }
            }} />
          )
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
