import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './app';
import SignupPage from './pages/sign-up'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={App} />
    <Route path="/sign-up" component={SignupPage} />
  </Switch>
);

export default Routes;
