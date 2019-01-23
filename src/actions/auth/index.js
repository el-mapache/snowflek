import {
  signUp,
  signIn,
  signOut,
  setErrors,
  validateToken,
  verifyingToken,
  verifyTokenFail,
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
      const formErrors = error.json.errors;
      dispatch(setErrors(formErrors));
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
      // TODO this error has to be manually transformed, since
      // devise doesnt send errors for general auth failure vs. bad form
      // data in the same way. This probably indicates we need a separate
      // action to handle form-level errors, since all these transforms are getting
      // a bit confusing
      dispatch(setErrors({
        form: error.json.errors[0]
      }));
    });
};

const signOutAction = dispatch => () => {
  fetch(`${NAMESPACE}/sign_out`, {
    method: 'DELETE'
  })
    .then(() => {
      dispatch(signOut());
      dispatch(addAppMessage({
        level: 'success',
        messages: ['You\'ve signed out successfully!'],
      }))
    })
    .catch((error) => {
      dispatch(addAppMessage({
        level: 'error',
        messages: error.json.errors,
      }));
    });
};

const verifyToken = dispatch => (params) => {
  dispatch(verifyingToken());

  fetch(`${NAMESPACE}/validate_token`, { params: { ...params } })
    .then(
      (response) => {
        dispatch(validateToken(response));
      },
      () => {
        dispatch(verifyTokenFail());
        dispatch(addAppMessage({
          level: 'error',
          messages: ['You must sign up or sign in to continue!'],
        }));
      }      
    );
};

export {
  signUpAction,
  signInAction,
  signOutAction,
  verifyToken,
};
