import { auth } from '../index';

const signUp = ({ email, password }) => ({
  type: auth.SIGN_UP,
  email,
  password
});

export {
  signUp
};
