import { friends } from '../index';

const fetchAllFriends = () => ({
  type: friends.FETCH_ALL,
});

const onFetchAllFriends = ({ friends }) => ({
  type: friends.ON_FETCH_ALL,
  friends,
});

export {
  fetchAllFriends,
  onFetchAllFriends,
};
