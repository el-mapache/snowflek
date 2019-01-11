import { auth } from '../index.js';

const authAction = type => ({ data, authHeaders }) => ({
  type,
  user: data,
  authHeaders,
});

const signUp = authAction(auth.SIGN_UP);
const signIn = authAction(auth.SIGN_IN);
const validateToken = authAction(auth.VERIFY_TOKEN);

const signOut = () => ({
  type: auth.SIGN_OUT
});

const setErrors = (errors) => ({
  type: auth.ERROR,
  errors
});

const verifyingToken = () => ({ type: auth.VERIFYING })

export {
  signUp,
  signIn,
  signOut,
  setErrors,
  verifyingToken,
  validateToken,
};
