import keyMirror from 'keymirror';

const auth = keyMirror({
  SIGN_UP: null,
  SIGN_IN: null,
  SIGN_OUT: null,
  ERROR: null,
});

const cookie = keyMirror({
  SET: null,
});

const droplet = keyMirror({
  ON_FETCH_ALL: null,
  FETCH_ALL: null,
});

export {
  auth,
  cookie,
  droplet,
};
