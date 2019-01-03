import { Cookies } from 'react-cookie';
import env from '../env';
import { auth } from '../actions';

const updateSession = store => next => action => {
  const { type, ...rest } = action;
  const cookies = new Cookies();

  if ([auth.SIGN_UP, auth.SIGN_IN].includes(type)) {
    cookies.set(env.authCookieKey, JSON.stringify({
      ...rest.authHeaders,
      userId: rest.user.id
    }), {
      path: '/'
    });
  } else if (type === auth.SIGN_OUT) {
    cookies.remove(env.authCookieKey, { path: '/' });
  }

  next(action);
};

export default updateSession;
