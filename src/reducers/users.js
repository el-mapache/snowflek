import { users } from '../actions';

const initialState = {
  users: {},
  isLoading: false,
  errors: {},
};

const usersReducer = (state = initialState, { type, ...rest }) => {
  switch(type) {
    case users.FETCHING:
      return {
        ...state,
        isLoading: true,
      };
    case users.FIND:
      return {
        ...state.errors,
        isLoading: false,
        users: {
          ...state.users,
          [rest.user.id]: rest.user
        },
      };
    case users.ERRORS:
      debugger
      return state;
    default:
      return state;
  }
};

export default usersReducer;
