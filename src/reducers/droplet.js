import { droplet } from '../actions';

const initialState = {
  droplets: [],
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
        droplets: rest.droplets,
        isFetching: false,
      };
    case droplet.ON_CREATE:
      return {
        // for now, we want to show the latest (just created) droplet first in the list
        droplets: [...rest.droplets, ...state.droplets],
        isFetching: false,
      };
    default:
      return initialState;
  }
}

export default dropletsReducer;
