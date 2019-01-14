import fetch from '../../utils/slowdrip-fetch';
import {
  fetchAllFriends,
  getFriendRequests,
  onGetFriendRequests,
} from './creators';

const getFriends = (dispatch) => () => {
  dispatch(fetchAllFriends());
};

const friendRequests = dispatch => () => {
  dispatch(getFriendRequests());

  fetch('friend_requests')
    .then(({ outgoing_requests, incoming_requests }) => {
      dispatch(onGetFriendRequests({
        outgoingRequests: outgoing_requests,
        incomingRequests: incoming_requests,
      }));
    })
    .catch((error) => {
      console.log('error?', error);
    });
};

const requestFriend = dispatch => (data) => {
  fetch('friend_requests', {
    method: 'POST',
    data,
  })
  .then((response) => {
    console.log('requested!', response)
  })
  .catch((response) => {
    console.log('request failed', response)
  });
};

export {
  getFriends,
  requestFriend,
  friendRequests,
};
