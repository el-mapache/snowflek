import fetch from '../../utils/slowdrip-fetch';
import { fetchAllFriends, friendRequest } from './creators';

const getFriends = (dispatch) => () => {
  dispatch(fetchAllFriends());
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
};
