import { foundUser, fetchingUser, userFetchError } from './creators';
import { onFriendRequestError } from '../friends/creators';
import fetch from '../../utils/slowdrip-fetch';

const resource = 'users';

const findUser = dispatch => ({ email }) => {
  dispatch(fetchingUser());

  fetch(`${resource}/search`, {
    params: { email }
  })
  .then(({ users }) => {
    // TODO: need to centralize app level messages. this is a workaround till
    // the basic features are complete. This triggers call to set the errors
    // back to an empty object in the friendship reducer, clearing it from
    // the front end
    dispatch(onFriendRequestError({}));

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
