import { createBrowserHistory } from 'history';
import { server } from '../actions';

const history = createBrowserHistory();

const redirect = () => next => action => {
  const { type } = action;

  if (type === server.NO_RESPONSE) {
    history.replace({ path: '/' });
  } else {
    return next(action);
  }
};

export default redirect;
