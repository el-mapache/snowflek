import { friendships } from '../index';

const onCreateFriendshipStart = () => ({
  type: friendships.ON_CREATE_FRIENDSHIP_START,
});
const onCreateFriendship = (friend) => ({
  type: friendships.ON_CREATE_FRIENDSHIP,
  friend
});
const onCreateFriendshipError = (errors) => ({
  type: friendships.ON_CREATE_FRIENDSHIP_ERROR,
  errors
});

export {
  onCreateFriendshipStart,
  onCreateFriendship,
  onCreateFriendshipError,
};
