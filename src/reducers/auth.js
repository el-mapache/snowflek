import { auth } from '../actions';
const initialState = {
  isAuthenticated: false,
  // TODO: this should be a separate thing I think
  user: {},
  errors: {},
};

const authReducer = (state = initialState, { type, ...rest }) => {
  switch(type) {
    case auth.SIGN_IN:
    case auth.SIGN_UP:
      return {
        errors: {},
        user: rest.data,
        isAuthenticated: true,
      };
    case auth.ERROR:
      // we don't need the full messages yet, pull them out of the errors object
      const { full_messages, ...fieldErrors} = rest.errors;

      return {
        ...state,
        errors: {
          ...state.errors,
          ...fieldErrors,
        }
      };
    case auth.SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
