import keyMirror from 'keymirror';

const auth = keyMirror({
  SET_AUTH_HEADERS: null,
  SIGN_UP: null,
  SIGN_IN: null,
  SIGN_OUT: null,
  VERIFY_TOKEN: null,
  ERROR: null,
});

const cookie = keyMirror({
  SET: null,
});

const droplet = keyMirror({
  ON_FETCH_ALL: null,
  FETCH_ALL: null,
  ON_CREATE: null,
});

const appMessages = keyMirror({
  ADD: null,
  CLEAR: null,
  CLEAR_ALL: null,
});

export {
  appMessages,
  auth,
  cookie,
  droplet,
};
