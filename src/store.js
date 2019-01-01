import { applyMiddleware, combineReducers, createStore } from 'redux';
import handleSession from './middlewares/session';
import authReducer from './reducers/auth';
import cookieReducer from './reducers/cookie';

const middlewares = applyMiddleware(handleSession);
const appState = combineReducers({ auth: authReducer, cookie: cookieReducer });
const store = createStore(appState, middlewares);

export default store;
