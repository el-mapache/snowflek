import { 
  onCreateFriendshipStart,
  onCreateFriendship,
  onCreateFriendshipError,
} from './creators';

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
  })
  .catch((error) => {
    dispatch(onCreateFriendshipError(error));
    console.log('error', error)
  });
};

export {
  confirmFriendship,
};
