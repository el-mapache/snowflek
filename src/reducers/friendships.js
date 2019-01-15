import { friendships } from '../actions';

const initialState = {
  errors: {},
  friend: null,
  isLoading: false,
};

const friendshipReducer = (state = initialState, { type, ...rest }) => {
  switch(type) {
    case friendships.ON_CREATE_FRIENDSHIP_START:
      return {
        ...state,
        errors: {},
        isLoading: true,
      };
    case friendships.ON_CREATE_FRIENDSHIP:
      return {
        errors: {},
        friend: rest.friend,
        isLoading: false,
      };
    case friendships.ON_CREATE_FRIENDSHIP_ERROR:
      return {
        ...state,
        errors: rest.errors,
        isLoading: false,
      }
    default:
      return state;
  }
};

export default friendshipReducer;
