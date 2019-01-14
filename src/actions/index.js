import keyMirror from 'keymirror';

const appMessages = keyMirror({
  ADD: null,
  CLEAR: null,
  CLEAR_ALL: null,
});

const auth = keyMirror({
  SET_AUTH_HEADERS: null,
  SIGN_UP: null,
  SIGN_IN: null,
  SIGN_OUT: null,
  VERIFYING: null,
  VERIFY_TOKEN: null,
  VERIFY_TOKEN_FAIL: null,
  ERROR: null,
});

const cookie = keyMirror({
  SET: null,
});

const droplet = keyMirror({
  ON_FETCH_ALL: null,
  FETCH_ALL: null,
  ON_CREATE: null,
  ON_CREATE_ERROR: null,
});

const friends = keyMirror({
  FETCH_ALL: null,
  ON_FETCH_ALL: null,
  REQUEST_FRIEND: null,
  FETCH_FRIEND_REQUESTS: null,
  ON_FETCH_FETCH_REQESTS: null,
  ADD_FRIEND: null,
  REMOVE_FRIEND: null,
  ON_ERROR: null,
});

const server = keyMirror({
  NO_RESPONSE: null
});

const users = keyMirror({
  FIND: null,
  FETCHING: null,
  ERROR: null,
});

export {
  appMessages,
  auth,
  cookie,
  droplet,
  friends,
  server,
  users,
};
