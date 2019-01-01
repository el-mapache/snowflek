import { auth } from '../index';

const signUp = ({ email, password }) => ({
  type: auth.SIGN_UP,
  email,
  password
});

const setErrors = (errors) => ({
  type: auth.ERROR,
  errors
});

export {
  signUp,
  setErrors
};
