import React from 'react';
import { Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import PrivateRoute from './components/private-route';
import RedirectRoute from './components/redirect-route';
import AuthProvider from './components/auth-provider';
import App from './app';
import Header from './components/header';
import SystemMessages from './components/system-messages';
import SignupPage from './pages/sign-up';
import SigninPage from './pages/sign-in';
import OwnDropletsPage from './pages/own-droplets';
import FriendsPage from './pages/friends';
import FriendDropletsPage from './pages/friend-droplets';
import FriendRequestsPage from './pages/friend-requests';

const Routes = () => (
  <AuthProvider>
    {(isAuthenticated, isAuthenticating) => (
      <>
        <Header isAuthenticated={isAuthenticated} />
        <App>
          <Container className="padding-top-2">
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
                isAuthenticating={isAuthenticating}
                isAuthenticated={isAuthenticated}
                component={OwnDropletsPage}
              />
              <PrivateRoute
                path="/friends"
                isAuthenticating={isAuthenticating}
                isAuthenticated={isAuthenticated}
                component={FriendsPage}
              />
              <PrivateRoute
                path="/friends/:id/droplets"
                isAuthenticating={isAuthenticating}
                isAuthenticated={isAuthenticated}
                component={FriendDropletsPage}
              />
              <PrivateRoute
                route="/friends/request"
                isAuthenticating={isAuthenticating}
                isAuthenticated={isAuthenticated}
                component={FriendRequestsPage}
              />
            </Switch>
          </Container>
        </App>
      </>
    )}
  </AuthProvider>
);

export default Routes;
