import { createBrowserHistory } from 'history';
import { server } from '../actions';

const history = createBrowserHistory();

const redirect = () => action => next => {
  const { type } = action;

  if (type === server.NO_RESPONSE) {
    history.replace({ path: '/' });
  }

  return next;
};

export default redirect;
