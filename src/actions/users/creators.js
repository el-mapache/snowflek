import { users } from '../index';

const fetchUser = (user) => ({
  type: users.FIND,
  user
});

const fetchingUser = () => ({
  type: users.FETCHING,
});

const userFetchError = (errors) => ({
  type: users.ERROR,
  errors,
});

export {
  fetchUser,
  fetchingUser,
  userFetchError,
};
