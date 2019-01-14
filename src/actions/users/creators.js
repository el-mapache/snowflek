import { users } from '../index';

const foundUser = (foundUsers) => ({
  type: users.FIND,
  users: foundUsers,
});

const fetchingUser = () => ({
  type: users.FETCHING,
});

const userFetchError = (errors) => ({
  type: users.ERROR,
  errors,
});

export {
  foundUser,
  fetchingUser,
  userFetchError,
};
