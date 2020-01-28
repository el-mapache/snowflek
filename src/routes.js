import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/private-route';
import RedirectRoute from './components/redirect-route';
import AuthProvider from './components/auth-provider';
import App from './app';
import Header from './components/header';
import SystemMessages from './components/system-messages';
import LandingPage from './pages/landing';
import SigninPage from './pages/sign-in';
import SignupPage from './pages/sign-up';
import OwnDropletsPage from './pages/own-droplets';
import FriendsPage from './pages/friends';
import FriendDropletsPage from './pages/friend-droplets';
import FriendRequestsPage from './pages/friend-requests';

function appPaths(isAuthenticated, isAuthenticating) {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={LandingPage}
      />
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
        exact
        path="/droplets"
        redirectPath="/sign-in"
        isAuthenticating={isAuthenticating}
        isAuthenticated={isAuthenticated}
        component={OwnDropletsPage}
      />
      <PrivateRoute
        exact
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
  );
}

const Routes = () => (
  <AuthProvider>
    {(isAuthenticated, isAuthenticating) => (
      <React.Fragment>
        <Header isAuthenticated={isAuthenticated} isAuthenticating={isAuthenticating} />
        <App className="my-16">
          
          <div className="xl:w-3/4 mx-auto">
            { appPaths(isAuthenticated, isAuthenticating) }
          </div>
        </App>
      </React.Fragment>
    )}
  </AuthProvider>
);

export default Routes;
