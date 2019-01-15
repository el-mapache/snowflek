import { friends } from '../index';

const fetchAllFriends = () => ({
  type: friends.FETCH_ALL,
});

const onFetchAllFriends = ({ friends }) => ({
  type: friends.ON_FETCH_ALL,
  friends,
});

const friendRequest = () => ({
  type: friends.REQUEST_FRIEND,
});

const getFriendRequests = () => ({
  type: friends.FETCH_FRIEND_REQUESTS,
});

const onGetFriendRequests = (friendRequests) => ({
  type: friends.ON_FETCH_FETCH_REQESTS,
  friendRequests,
});

const onFriendRequestError = (error) => ({
  type: friends.ON_ERROR,
  error,
});

export {
  fetchAllFriends,
  onFetchAllFriends,
  friendRequest,
  getFriendRequests,
  onGetFriendRequests,
  onFriendRequestError,
};
