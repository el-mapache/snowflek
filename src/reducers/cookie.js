import { cookie } from '../actions';

const initialState = {
  cookie: null
};

const cookieReducer = (state = initialState, { type, cookieInfo }) => {
  switch(type) {
    case cookie.SET:
      return { ...state, cookie: cookieInfo };
    default:
      return state;
  }
};

export default cookieReducer;
