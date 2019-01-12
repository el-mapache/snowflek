import { fetchUser, fetchingUser, userFetchError } from './creators';
import fetch from '../../utils/slowdrip-fetch';

const resource = 'users';

const fetchUser = dispatch => ({ email }) => {
  dispatch(fetchingUser());

  fetch(`${resource}/search`, {
    params: { email }
  })
  .then((response) => {
    dispatch(fetchUser());
    console.log('response?', response);
  })
  .catch((response) => {
    dispatch(userFetchError());
    console.log('error?', response);
  });
}

export {
  fetchUser,
};
