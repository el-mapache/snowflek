import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import updateSession from './middlewares/session';
import appStatusReducer from './reducers/app-status';
import appMessagesReducer from './reducers/app-messages';
import authReducer from './reducers/auth';
import cookieReducer from './reducers/cookie';
import dropletReducer from './reducers/droplet';
import {createBrowserHistory } from 'history';

const middlewares = applyMiddleware(updateSession, logger);
const appState = combineReducers({
  appMessages: appMessagesReducer,
  appStatus: appStatusReducer,
  auth: authReducer,
  cookie: cookieReducer,
  droplets: dropletReducer,
});

const store = createStore(appState, middlewares);

export default store;
