import { friends } from "../actions";

const initialState = {
  errors: {},
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
    case friends.ON_FETCH_FETCH_REQESTS:
      const { friendRequests } = rest;

      return {
        errors: {},
        isLoading: false,
        incomingRequests: [
          ...state.incomingRequests,
          ...friendRequests.incomingRequests,
        ],
        outgoingRequests: [
          ...state.outgoingRequests,
          ...friendRequests.outgoingRequests,
        ],
      }
    default:
      return state;
  }
};

export default friendRequestReducer;
