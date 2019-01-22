import { foundUser, fetchingUser, userFetchError, setCurrentUser } from './creators';
import { addPageMessage } from '../app-messages/creators';
import { onFriendRequestError } from '../friend-requests/creators';
import fetch from '../../utils/slowdrip-fetch';

const resource = 'users';

const findUser = dispatch => ({ email }) => {
  dispatch(fetchingUser());

  fetch(`${resource}/search`, {
    params: { email }
  })
  .then(
    ({ users }) => {
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
        dispatch(setCurrentUser({ currentUser: users[0] }));
      }
    },
    (error) => {
      console.log('error?', error);
      dispatch(userFetchError());
    }
  );
};

// user show page returns droplets for that user,
// not the user themselves. we need to return the user as well
const showUser = dispatch => ({ id }) => {
  dispatch(fetchingUser());

  return fetch(`${resource}/${id}`)
    .then((response) => {
      const { user } = response;

      dispatch(foundUser(user));
      
      return response;
    },
    (error) => {
      // TODO: do something with me?
      console.log('an error occured!', error.json);
      /**
       * TODO: this paradigm is also sort of screwed up
       * It basically means that any time this action is called, the error
       * is going to get thrown out to the app unless something catches it,
       * which means the whole app (and programmer developing it) needs to be aware
       * of this
       */
      throw error;
    });
};


export {
  findUser,
  showUser,
};
