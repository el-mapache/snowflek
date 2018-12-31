import { auth } from '../actions';
const initialState = {
  accessToken: '',
  errors: null,
};

const authReducer = (state = initialState, { action, ...rest }) => {
  switch(action) {
    case auth.SIGN_UP:
      return state;
    case auth.SIGN_IN:
      return { ...state, accessToken: rest.accessToken };
    default:
      return state;
  }
};

export default authReducer;
