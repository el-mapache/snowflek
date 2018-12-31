import { cookie } from '../index';

const setCookie = ({ cookieInfo }) => ({
  type: cookie.SET,
  cookieInfo,
});

export { setCookie };
