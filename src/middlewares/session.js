import { Cookies } from 'react-cookie';
import { auth } from '../actions';

// TODO: could be env configurable!
// and so could the expiry/security settings?
const cookieKey = 'authToken';

const handleSession = store => next => action => {
  const { type, ...rest } = action;

  if (type === (auth.SIGN_UP || auth.SIGN_IN)) {
    Cookies.set(cookieKey, rest.auth_token, {
      expires: rest.expires,
    });
  } else if (type === auth.SIGN_OUT) {
    Cookies.remove(cookieKey);
  }

  next(action);
};

export default handleSession;
