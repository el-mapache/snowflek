import { users as userActions } from '../index';

/** 
 * TODO/IDEA generate a list of functions that output the
 * action type, so that reducers and creators can call that
 * function and not have to worry about updating the names
 * when / if refactoring and changes occur
 * 
*/
const foundUser = (user) => ({
  type: userActions.ON_USER_FIND,
  user,
});

const fetchingUser = () => ({
  type: userActions.START_USER_FIND,
});

const userFetchError = (errors) => ({
  type: userActions.ON_USER_FIND_ERROR,
  errors,
});

const setCurrentUser = (currentUser) => ({
  type: userActions.SET_CURRENT_USER,
  currentUser,
});

const unsetCurrentUser = () => ({
  type: userActions.UNSET_CURRENT_USER,
});

export {
  foundUser,
  fetchingUser,
  userFetchError,
  setCurrentUser,
  unsetCurrentUser,
};
