import keyMirror from 'keymirror';

const auth = keyMirror({
  SIGN_UP: null,
  SIGN_IN: null,
  SIGN_OUT: null,
});

const cookie = keyMirror({
  SET: null,
});

export {
  auth,
  cookie,
};
