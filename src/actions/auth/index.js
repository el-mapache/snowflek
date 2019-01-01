import { signUp, setErrors } from './creators';
import fetch from '../../fetch';


const NAMESPACE = 'auth';

const signUpAction = dispatch => async ({ email, password }) => {
  let response;

  try {
    response = await fetch(NAMESPACE, {
      method: 'POST',
      data: { email, password },
    });
  } catch({ json }) {
    dispatch(setErrors(json.errors));
  }
};

const signInAction = dispatch => async ({ email, password }) => {
  let response;

  try {
    response = await fetch(`${NAMESPACE}/sign_in`, {
      method: 'POST',
      data: { email, password }
    })
  } catch(error) {
    console.log(error);
  }
}

export {
  signUpAction
};
