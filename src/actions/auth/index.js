import { signUp } from './creators';
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
    console.log(json);
  }
};

export {
  signUpAction
};
