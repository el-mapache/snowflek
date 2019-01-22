import { users } from '../index';

/** 
 * TODO/IDEA generate a list of functions that output the
 * action type, so that reducers and creators can call that
 * function and not have to worry about updating the names
 * when / if refactoring and changes occur
 * 
*/
const foundUser = (user) => ({
  type: users.ON_USER_FIND,
  user,
});

const fetchingUser = () => ({
  type: users.START_USER_FIND,
});

const userFetchError = (errors) => ({
  type: users.ON_USER_FIND_ERROR,
  errors,
});

const setCurrentUser = (currentUser) => ({
  type: users.SET_CURRENT_USER,
  currentUser,
});

const unsetCurrentUser = () => ({
  type: users.UNSET_CURRENT_USER,
});

export {
  foundUser,
  fetchingUser,
  userFetchError,
  setCurrentUser,
  unsetCurrentUser,
};
