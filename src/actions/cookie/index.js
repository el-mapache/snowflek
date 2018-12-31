import { setCookie as setCookieCreator } from './creators';

const setCookie = dispatch => (cookie) => {
  dispatch(setCookieCreator({ cookieInfo: cookie }));
};

export { setCookie };
