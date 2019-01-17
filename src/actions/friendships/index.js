import fetch from '../../utils/slowdrip-fetch';
import { 
  onCreateFriendshipStart,
  onCreateFriendship,
  onCreateFriendshipError,
} from './creators';
import { getAllFriendRequests } from '../friend-requests';

const resource = 'friendships';

export const confirmFriendship = dispatch => ({ id }) => {
  dispatch(onCreateFriendshipStart());

  fetch(resource, {
    method: 'POST',
    data: {
      friend: { id },
    },
  })
  .then(({ friend }) => {
    dispatch(onCreateFriendship(friend));
    // trigger a refresh to the list of pending friendships
    getAllFriendRequests(dispatch)();
  })
  .catch((error) => {
    dispatch(onCreateFriendshipError(error));
    console.log('error', error)
  });
};
