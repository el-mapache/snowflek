import { users } from '../actions';

const initialState = {
  currentUser: null,
  errors: {},
  isLoading: false,
  users: {},
};

const usersReducer = (state = initialState, { type, ...rest }) => {
  switch(type) {
    case users.START_USER_FIND:
      return {
        ...state,
        errors: {},
        isLoading: true,
      };
    case users.ON_USER_FIND:
      const current = rest.user;

      return {
        ...state,
        errors: {},
        isLoading: false,
        users: {
          ...state.users,
          [current.id]: current,
        },
      };
    case users.ON_USER_FIND_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: { ...rest.errors }
      };
    case users.UNSET_CURRENT_USER:
      return {
        ...state,
        currentUser: null,
      };
    case users.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: rest.currentUser,
      };
    default:
      return state;
  }
};

export const userSelector = (state, id) => state.users.users[id];
export const userLoadingSelector = state => state.users.isLoading;

export default usersReducer;
