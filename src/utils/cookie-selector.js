import env from '../env';
import { Cookies } from 'react-cookie';

const cookies = () => new Cookies();

export default {
  getAuthHeaders() {
    return cookies().get(env.authCookieKey);
  }
};
