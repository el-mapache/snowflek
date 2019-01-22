import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import Routes from './routes';

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>, document.getElementById('root')
);

