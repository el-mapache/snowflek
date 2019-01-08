import {
  setAuthHeaders,
  signUp,
  signIn,
  signOut,
  setErrors
} from './creators';
import { addAppMessage } from '../app-messages/creators';
import fetch from '../../utils/slowdrip-fetch';

const NAMESPACE = 'auth';

const signUpAction = dispatch => ({ email, password }) => {
  fetch(NAMESPACE, {
      method: 'POST',
      data: { email, password },
    }).then((response) => {
      dispatch(signUp(response));
    }) 
    .catch((error) => {
      dispatch(setErrors(error.json.errors));
    });
};

const signInAction = dispatch => ({ email, password }) => {
  fetch(`${NAMESPACE}/sign_in`, {
    method: 'POST',
    data: { email, password }
  })
    .then((response) => {
      dispatch(signIn(response));
    })
    .catch((error) => {
      dispatch(addAppMessage({
        level: 'error',
        messages: error.json.errors
      }));
    });
};

const signOutAction = dispatch => () => {
  fetch(`${NAMESPACE}/sign_out`, {
    method: 'DELETE'
  })
    .then(() => {
      dispatch(signOut());
    })
    .catch((error) => {
      dispatch(signOut());
      console.log('error signing out!', error);
    });
}

const setHeadersAction = dispatch => (headers) => {
  dispatch(setAuthHeaders(headers));
};

export {
  signUpAction,
  signInAction,
  signOutAction,
  setHeadersAction,
};
