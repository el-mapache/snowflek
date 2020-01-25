import { droplet } from '../actions';

const initialState = {
  droplets: [],
  errors: {},
  isFetching: false,
};

const dropletsReducer = (state = initialState, { type, ...rest }) => {
  switch(type) {
    case droplet.FETCH_ALL: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case droplet.ON_FETCH_ALL:
      return {
        ...state,
        droplets: rest.droplets,
        isFetching: false,
      };
    case droplet.ON_CREATE:
      const [ mostRecentDroplet ] = rest.droplets;

      return {
        // for now, we want to show the latest (just created) droplet first in the list
        droplets: [mostRecentDroplet, ...state.droplets],
        errors: {},
        isFetching: false,
      };
    case droplet.ON_CREATE_ERROR:
      return {
        ...state,
        errors: { 'content': rest.error[0] }
      };
    default:
      return initialState;
  }
}

export default dropletsReducer;
