import { Cookies } from 'react-cookie';
import env from '../env';
import { auth } from '../actions';

const signOutActions = [
  auth.SIGN_OUT,
  auth.VERIFY_TOKEN_FAIL
];
const signInActions = [
  auth.SIGN_UP,
  auth.SIGN_IN
];

const isUserSigningIn = type => signInActions.includes(type);
const isUserSigningOut = type => signOutActions.includes(type);

const updateSession = () => next => action => {
  const { type, ...rest } = action;
  const cookies = new Cookies();

  if (isUserSigningIn(type)) {
    cookies.set(env.authCookieKey, JSON.stringify({
      ...rest.authHeaders,
      userId: rest.user.id,
    }), {
      path: '/'
    });
  } else if (isUserSigningOut(type)) {
    cookies.remove(env.authCookieKey, { path: '/' });
  }

  next(action);
};

export default updateSession;
