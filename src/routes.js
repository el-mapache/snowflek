import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from './components/private-route';
import RedirectRoute from './components/redirect-route';
import AuthProvider from './components/auth-provider';
import App from './app';
import Header from './components/header';
import SystemMessages from './components/system-messages';
import SignupPage from './pages/sign-up';
import SigninPage from './pages/sign-in';
import OwnDropletsPage from './pages/own-droplets';
import FriendDropletsPage from './pages/friend-droplets';
import RequestFriendPage from './pages/request-friend';

const Routes = () => (
  <AuthProvider>
    {(isAuthenticated, isOptimistic) => (
      <App>
        <Header isAuthenticated={isAuthenticated} />
        <SystemMessages />
        <Switch>
          <RedirectRoute
            exact
            path="/sign-in"
            component={SigninPage}
            shouldRedirect={isAuthenticated}
            redirectTo="/droplets"
          />
          <RedirectRoute
            path="/sign-up"
            component={SignupPage}
            shouldRedirect={isAuthenticated}
            redirectTo="/droplets"
          />
          <PrivateRoute
            path="/droplets"
            isOptimistic={isOptimistic}
            isAuthenticated={isAuthenticated}
            component={OwnDropletsPage}
          />
          <PrivateRoute
            path="friends/:id/droplets"
            isAuthenticated={isAuthenticated}
            component={FriendDropletsPage}
          />
          <PrivateRoute
            route="/friends/request"
            isOptimistic={isOptimistic}
            isAuthenticated={isAuthenticated}
            component={RequestFriendPage}
          />
        </Switch>
      </App>
    )}
  </AuthProvider>
);

export default Routes;
