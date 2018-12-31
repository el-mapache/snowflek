import { combineReducers, createStore } from 'redux';
import authReducer from './reducers/auth';
import cookieReducer from './reducers/cookie';

const store = createStore(combineReducers({ auth: authReducer, cookie: cookieReducer }));

export default store;
