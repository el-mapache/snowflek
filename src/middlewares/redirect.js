import { createBrowserHistory } from 'history';
import { server } from '../actions';

const history = createBrowserHistory();

const redirect = () => next => action => {
  const { type } = action;

  if (type === server.NO_RESPONSE) {
    history.replace({ path: '/' });
  }

  // We want to halt all actions here, because the server isnt active.
  // we'll need some kind of landing page or oops! error page probably
  return;
};

export default redirect;
