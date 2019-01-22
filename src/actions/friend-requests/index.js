import fetch from '../../utils/slowdrip-fetch';
import {
  fetchAllFriends,
  getFriendRequests,
  onGetFriendRequests,
  onFriendRequestError,
} from './creators';
import { unsetCurrentUser } from '../users/creators';

const resource = 'friend_requests';

const getFriends = (dispatch) => () => {
  dispatch(fetchAllFriends());
};

const getAllFriendRequests = dispatch => () => {
  dispatch(getFriendRequests());

  fetch(resource)
    .then(({ outgoing_requests, incoming_requests }) => {
      dispatch(onGetFriendRequests({
        outgoingRequests: outgoing_requests,
        incomingRequests: incoming_requests,
      }));
    })
    .catch((error) => {
      // TODO: handle this, somehow
      console.log('error?', error);
    });
};

const requestFriendship = dispatch => ({ id }) => {
  fetch(resource, {
    method: 'POST',
    data: {
      friend: { id }
    },
  })
  .then(() => {
    // TODO this pattern is really weird, so make the fetch request a separate method, I think
    // probably also make the `then` callback separate?
    getAllFriendRequests(dispatch)();
  })
  .catch((error) => {
    const { json } = error;
    const errorObject = Object.entries(json);
    // TODO why is every error formatted so goofily?
    const formattedError = `${errorObject[0][0]} ${errorObject[0][1]}`;

    dispatch(onFriendRequestError({
      form: formattedError,
    }));
  })
  .finally(() => dispatch(unsetCurrentUser()));
};

export {
  getAllFriendRequests,
  getFriends,
  requestFriendship,
};