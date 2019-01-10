import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import updateSession from './middlewares/session';
import redirect from './middlewares/redirect';
import appMessagesReducer from './reducers/app-messages';
import authReducer from './reducers/auth';
import cookieReducer from './reducers/cookie';
import dropletReducer from './reducers/droplet';

const middlewares = applyMiddleware(updateSession, redirect, logger);
const appState = combineReducers({
  auth: authReducer,
  cookie: cookieReducer,
  droplets: dropletReducer,
  appMessages: appMessagesReducer,
});

const store = createStore(appState, middlewares);

export default store;
