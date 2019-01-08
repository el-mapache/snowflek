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

const Routes = () => (
  <AuthProvider>
    {(isAuthenticated) => (
      <App>
      <Header isAuthenticated={isAuthenticated} />
      <SystemMessages />
        <Switch>
          <RedirectRoute path="/sign-in" component={SigninPage} shouldRedirect={isAuthenticated} redirectTo="/droplets" />
          <RedirectRoute path="/sign-up" component={SignupPage} shouldRedirect={isAuthenticated} redirectTo="/droplets" />
          <PrivateRoute
            path="/droplets"
            isAuthenticated={isAuthenticated}
            component={OwnDropletsPage}
          />
        </Switch>
      </App>
    )}
  </AuthProvider>
);

export default Routes;
