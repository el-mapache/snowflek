import { auth, server } from '../actions';
const initialState = {
  authHeaders: null,
  errors: {},
  isAuthenticated: false,
  isLoading: false,
  // TODO: this should be a separate thing I think
  user: null,
};

const authReducer = (state = initialState, { type, ...rest }) => {
  switch(type) {
    case auth.SIGN_IN:
    case auth.SIGN_UP:
    case auth.VERIFY_TOKEN:
      return {
        errors: {},
        user: rest.user,
        authHeaders: { ...rest.authHeaders },
        isAuthenticated: true,
        isLoading: false,
      };
    case auth.VERIFYING:
      return {
        ...state,
        isLoading: true,
      };
    case auth.VERIFY_TOKEN_FAIL:
      return {
        ...state,
        authHeaders: null,
        isLoading: false,
      };
    case auth.ERROR:
      // we don't need the full messages yet, pull them out of the errors object
      const { full_messages, ...errorsFromServer} = rest.errors;

      return {
        ...state,
        errors: {
          ...state.errors,
          ...errorsFromServer,
        },
        isLoading: false,
      };
    case auth.SIGN_OUT:
      return initialState;
    case server.NO_RESPONSE:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state;
  }
};

export default authReducer;
