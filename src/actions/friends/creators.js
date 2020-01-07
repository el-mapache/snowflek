import { friends as friendActions } from '../index';
console.log(friendActions)
const getFriendsAction = () => ({
  type: friendActions.FETCH_ALL_FRIENDS
});
const getFriendsErrorAction = (errors) => ({
  type: friendActions.ON_FETCH_ALL_FRIENDS_ERROR,
  errors
});
const setFriendsAction = (friends) => ({
  type: friendActions.ON_FETCH_ALL_FRIENDS,
  friends
});

export {
  getFriendsAction,
  getFriendsErrorAction,
  setFriendsAction
};
