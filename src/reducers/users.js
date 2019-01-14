import { users } from '../actions';

const initialState = {
  users: {},
  current: null,
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
      const [ current ] = rest.users;
      return {
        current: current.email,
        errors: {},
        isLoading: false,
        users: {
          ...state.users,
          [current.email]: current,
        },
      };
    case users.ERROR:
      return {
        ...state,
        isLoading: false,
        errors: { ...rest.errors }
      };
    default:
      return state;
  }
};

export default usersReducer;
