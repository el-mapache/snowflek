import fetch from '../../utils/slowdrip-fetch';
import { 
  onCreateFriendshipStart,
  onCreateFriendship,
  onCreateFriendshipError,
} from './creators';
import { friendRequests } from '../friends';

const confirmFriendship = dispatch => ({ id, email }) => {
  dispatch(onCreateFriendshipStart());

  fetch('friendships', {
    method: 'POST',
    data: {
      friend: {
        id
      },
    },
  })
  .then(({ friend }) => {
    dispatch(onCreateFriendship(friend));
    friendRequests(dispatch)();
  })
  .catch((error) => {
    dispatch(onCreateFriendshipError(error));
    console.log('error', error)
  });
};

export {
  confirmFriendship,
};
