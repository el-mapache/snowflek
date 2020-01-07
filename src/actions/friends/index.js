import {
  getFriendsErrorAction,
  setFriendsAction,
  getFriendsAction
} from './creators';
import fetch from '../../utils/slowdrip-fetch';

const resource = 'friends';

const getFriends = dispatch => () => {
  dispatch(getFriendsAction());

  fetch(`${resource}`)
    .then(({ friends }) => {
      dispatch(setFriendsAction(friends));
    }, 
    (errors) => {
      console.log('Errors!', errors)
    });
};

export {
  getFriends
};
