import { foundUser, fetchingUser, userFetchError } from './creators';
import fetch from '../../utils/slowdrip-fetch';

const resource = 'users';

const findUser = dispatch => ({ email }) => {
  dispatch(fetchingUser());

  fetch(`${resource}/search`, {
    params: { email }
  })
  .then(({ users }) => {
    if (!users.length) {
      dispatch(userFetchError({
        form: `Sorry, we couldn't find your friend's email: ${email}.`,
      }))
    } else {
      dispatch(foundUser(users));
    }
  })
  .catch((response) => {
    dispatch(userFetchError());
    console.log('error?', response);
  });
}

export {
  findUser,
};
