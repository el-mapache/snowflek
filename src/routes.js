import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './app';
import SignupPage from './pages/sign-up'
import OwnDropletsPage from './pages/own-droplets';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={App} />
    <Route path="/sign-up" component={SignupPage} />
    <Route path="/me/droplets" component={OwnDropletsPage} />
  </Switch>
);

export default Routes;
