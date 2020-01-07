import { friends as friendActionTypes } from '../actions';

const initialState = {
  errors: {},
  friends: {},
  isLoading: false
};

const friendsReducer = (state = initialState, { type, ...rest }) => {
  switch(type) {
    case friendActionTypes.FETCH_ALL_FRIENDS:
      return {
        ...state,
        isLoading: true
      };
    case friendActionTypes.ON_FETCH_ALL_FRIENDS:
      const friends = rest.friends.reduce((accum, friend) => ({ ...accum, [friend.id]: friend }), {});

      return {
        ...state,
        isLoading: false,
        errors: {},
        friends: {
          ...state.friends,
          ...friends
        }
      };
    default: {
      return state;
    }
  }
};

export default friendsReducer;
