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

  // We want to halt all actions here, because the server isnt active.
  // We have to do this with a reducer and a route


  // we'll need some kind of landing page or oops! error page probably
  // If we don't do this, the remaining actions will fire, including
  // setting the auth headers in the app store. Although this is tchnically correct,
  // even if the user is logged in, I'm not sure we want to load any pages
  // when the server is not responding.
  
};

export default redirect;
