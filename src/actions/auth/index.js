import { signUp } from './creators';
import fetch from '../../fetch';


const NAMESPACE = 'auth';

const signUpAction = dispatch => async ({ email, password }, token) => {  
  const response = await fetch(NAMESPACE, {
    method: 'POST',
    data: { email, password },
    headers: {
      'X-CSRF-TOKEN': token
    }
  });

  console.log(response)
};

export {
  signUpAction
};
