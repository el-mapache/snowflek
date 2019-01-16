import { friends } from "../actions";

const initialState = {
  error: {},
  isLoading: false,
  incomingRequests: [],
  outgoingRequests: [],
};

const friendRequestReducer = (state = initialState, { type, ...rest }) => {
  switch(type) {
    case friends.FETCH_FRIEND_REQUESTS:
      return {
        ...state,
        isLoading: true,
      };
    case friends.ON_FETCH_FRIEND_REQUESTS:
      const { friendRequests } = rest;

      return {
        error: {},
        isLoading: false,
        incomingRequests: friendRequests.incomingRequests,
        outgoingRequests: friendRequests.outgoingRequests,
      }
    case friends.ON_ERROR:
      return {
        ...state,
        error: rest.error
      }
    default:
      return state;
  }
};

export default friendRequestReducer;
