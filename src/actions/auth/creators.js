import { auth } from '../index.js';

const authAction = type => ({ data, authHeaders }) => ({
  type,
  user: data,
  authHeaders,
});

const signUp = authAction(auth.SIGN_UP);
const signIn = authAction(auth.SIGN_IN);

const signOut = () => ({
  type: auth.SIGN_OUT
});

const setErrors = (errors) => ({
  type: auth.ERROR,
  errors
});

const verifyToken = ({ data, authHeaders }) => ({
  type: auth.VERIFY_TOKEN,
  user: data,
  authHeaders,
});

const setAuthHeaders = (authHeaders) => ({
  type: auth.SET_AUTH_HEADERS,
  authHeaders
});

export {
  signUp,
  signIn,
  signOut,
  setAuthHeaders,
  setErrors,
  verifyToken,
};
